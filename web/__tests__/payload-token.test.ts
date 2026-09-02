// @vitest-environment node
// jsdom's TextEncoder returns a cross-realm Uint8Array that jose rejects, and
// middleware runs server-side anyway.
import { createHash } from 'node:crypto'

import { jwtSign } from 'payload'
import { describe, expect, it } from 'vitest'

import { isPayloadTokenUsable } from '../lib/payload-token'

const SECRET = 'a'.repeat(64)
const OTHER_SECRET = 'b'.repeat(64)

// Payload signs with sha256(secret) hex truncated to 32 chars, not the raw
// secret. jwtSign takes that derived key, so mirror payload's own derivation.
const derive = (secret: string) =>
  createHash('sha256').update(secret).digest('hex').slice(0, 32)

const signWith = async (secret: string, tokenExpiration = 7200) =>
  (
    await jwtSign({
      fieldsToSign: { id: 1, collection: 'users', email: 'admin@example.com' },
      secret: derive(secret),
      tokenExpiration,
    })
  ).token

describe('isPayloadTokenUsable', () => {
  it('accepts a token Payload itself just signed', async () => {
    expect(await isPayloadTokenUsable(await signWith(SECRET), SECRET)).toBe(true)
  })

  it('rejects a token signed with a rotated secret', async () => {
    // The reported bug: PAYLOAD_SECRET changed, browser kept replaying the cookie.
    expect(await isPayloadTokenUsable(await signWith(OTHER_SECRET), SECRET)).toBe(false)
  })

  it('rejects an expired token', async () => {
    expect(await isPayloadTokenUsable(await signWith(SECRET, -60), SECRET)).toBe(false)
  })

  it('rejects malformed tokens', async () => {
    for (const token of ['', 'nope', 'a.b', 'a.b.c']) {
      expect(await isPayloadTokenUsable(token, SECRET)).toBe(false)
    }
  })

  it('rejects a token whose signature is stripped or swapped', async () => {
    const [header, payload] = (await signWith(SECRET)).split('.')
    const forged = (await signWith(OTHER_SECRET)).split('.')[2]
    expect(await isPayloadTokenUsable(`${header}.${payload}.${forged}`, SECRET)).toBe(false)
  })

  it('does not accept the raw secret as the signing key', async () => {
    // Guards the exact trap: verifying with PAYLOAD_SECRET instead of its
    // sha256-derived key would reject every genuine session.
    const rawSigned = await jwtSign({
      fieldsToSign: { id: 1, collection: 'users' },
      secret: SECRET,
      tokenExpiration: 7200,
    })
    expect(await isPayloadTokenUsable(rawSigned.token, SECRET)).toBe(false)
  })
})
