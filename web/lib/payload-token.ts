export const PAYLOAD_TOKEN_COOKIE = 'payload-token'

const encoder = new TextEncoder()

function base64UrlToBytes(input: string): Uint8Array<ArrayBuffer> {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(new ArrayBuffer(binary.length))
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return bytes
}

// Payload does not sign with PAYLOAD_SECRET directly. It derives the HMAC key as
// sha256(secret) hex-encoded and truncated to 32 chars — see payload/dist/index.js
// (`this.secret = createHash('sha256').update(config.secret).digest('hex').slice(0, 32)`).
// Verifying against the raw secret would reject every genuine session.
async function signingKey(secret: string): Promise<CryptoKey> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(secret))
  const hex = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(hex.slice(0, 32)),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  )
}

/**
 * True when `token` is an unexpired HS256 JWT signed by `secret`.
 * Anything unparseable, wrongly signed, or expired is not usable.
 */
export async function isPayloadTokenUsable(token: string, secret: string): Promise<boolean> {
  const [header, payload, signature] = token.split('.')
  if (!header || !payload || !signature) return false

  try {
    const verified = await crypto.subtle.verify(
      'HMAC',
      await signingKey(secret),
      base64UrlToBytes(signature),
      encoder.encode(`${header}.${payload}`),
    )
    if (!verified) return false

    const claims = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as {
      exp?: number
    }
    return typeof claims.exp === 'number' && claims.exp * 1000 > Date.now()
  } catch {
    return false
  }
}
