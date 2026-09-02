import { NextResponse, type NextRequest } from 'next/server'

import {
  isAuthDebugEnabled,
  logAuthRequest,
  logAuthResponse,
} from './lib/auth-debug-log'
import { PAYLOAD_TOKEN_COOKIE, isPayloadTokenUsable } from './lib/payload-token'

const AUTH_PATHS = /^\/(admin|api\/users)/

function isLoginPost(request: NextRequest): boolean {
  return request.method === 'POST' && request.nextUrl.pathname === '/api/users/login'
}

/**
 * Payload's extractJWT (when csrf is non-empty — and sanitize always pushes
 * serverURL into csrf) only accepts cookies if Origin is allowlisted OR
 * Sec-Fetch-Site is same-origin/same-site/none. Document navigations to /admin
 * often send neither over plain HTTP, so login succeeds then /admin bounces
 * back to /admin/login. Inject the missing headers for verified same-origin
 * sessions so Payload will read the cookie.
 */
function withCookieAuthHeaders(request: NextRequest): Headers {
  const headers = new Headers(request.headers)
  const publicUrl =
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    `${request.nextUrl.protocol}//${request.headers.get('host')}`

  if (!headers.get('origin') && publicUrl) {
    headers.set('origin', publicUrl)
  }
  if (!headers.get('sec-fetch-site')) {
    headers.set('sec-fetch-site', 'same-origin')
  }
  return headers
}

/**
 * Drop a payload-token cookie the server can no longer verify.
 *
 * Exception: POST /api/users/login — Payload sets a fresh token on the same
 * response; clearing here races and can produce two Set-Cookie headers.
 */
export async function middleware(request: NextRequest) {
  if (!AUTH_PATHS.test(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get(PAYLOAD_TOKEN_COOKIE)?.value
  const secret = process.env.PAYLOAD_SECRET

  if (!secret) {
    if (isAuthDebugEnabled()) {
      logAuthRequest(request, { tokenUsable: null, middlewareAction: 'skip-no-secret' })
    }
    return NextResponse.next()
  }

  if (!token) {
    if (isAuthDebugEnabled()) {
      logAuthRequest(request, { tokenUsable: null, middlewareAction: 'skip-no-cookie' })
    }
    const response = NextResponse.next()
    if (isAuthDebugEnabled()) logAuthResponse(request, response)
    return response
  }

  const usable = await isPayloadTokenUsable(token, secret)

  if (usable) {
    const needsInject =
      !request.headers.get('origin') || !request.headers.get('sec-fetch-site')
    const response = needsInject
      ? NextResponse.next({ request: { headers: withCookieAuthHeaders(request) } })
      : NextResponse.next()

    if (isAuthDebugEnabled()) {
      logAuthRequest(request, {
        tokenUsable: true,
        middlewareAction: 'pass',
        note: needsInject
          ? 'injected Origin/Sec-Fetch-Site so Payload extractJWT accepts cookie'
          : undefined,
      })
      logAuthResponse(request, response)
    }
    return response
  }

  // Stale token: strip from forwarded request so Payload sees no cookie.
  const headers = new Headers(request.headers)
  const surviving = request.cookies
    .getAll()
    .filter((cookie) => cookie.name !== PAYLOAD_TOKEN_COOKIE)
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  if (surviving) headers.set('cookie', surviving)
  else headers.delete('cookie')

  const response = NextResponse.next({ request: { headers } })

  if (isLoginPost(request)) {
    if (isAuthDebugEnabled()) {
      logAuthRequest(request, {
        tokenUsable: false,
        middlewareAction: 'strip-forward',
        note: 'login POST: stripped stale token from forwarded request only (no Max-Age=0)',
      })
      logAuthResponse(request, response, 'login POST response (downstream may add Set-Cookie)')
    }
    return response
  }

  response.cookies.set(PAYLOAD_TOKEN_COOKIE, '', { path: '/', maxAge: 0 })
  if (isAuthDebugEnabled()) {
    logAuthRequest(request, {
      tokenUsable: false,
      middlewareAction: 'clear-browser',
      note: 'stale token: stripped forward + Set-Cookie Max-Age=0',
    })
    logAuthResponse(request, response)
  }
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
