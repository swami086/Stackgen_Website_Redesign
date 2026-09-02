import { NextResponse, type NextRequest } from 'next/server'

import { PAYLOAD_TOKEN_COOKIE, isPayloadTokenUsable } from './lib/payload-token'

/**
 * Drop a payload-token cookie the server can no longer verify.
 *
 * Payload answers an unverifiable token with `user: null` but leaves the cookie
 * in place, so a browser holding one from a rotated PAYLOAD_SECRET (or a dropped
 * database) keeps replaying it against the same host and the admin never
 * recovers without the user manually clearing cookies. Stripping it from the
 * forwarded request *and* expiring it in the browser makes that self-healing.
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(PAYLOAD_TOKEN_COOKIE)?.value
  const secret = process.env.PAYLOAD_SECRET

  if (!token || !secret) return NextResponse.next()
  if (await isPayloadTokenUsable(token, secret)) return NextResponse.next()

  const headers = new Headers(request.headers)
  const surviving = request.cookies
    .getAll()
    .filter((cookie) => cookie.name !== PAYLOAD_TOKEN_COOKIE)
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  if (surviving) headers.set('cookie', surviving)
  else headers.delete('cookie')

  const response = NextResponse.next({ request: { headers } })
  // Match how Payload scopes the cookie so the browser actually replaces it.
  response.cookies.set(PAYLOAD_TOKEN_COOKIE, '', { path: '/', maxAge: 0 })
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
