import type { NextRequest, NextResponse } from 'next/server'

const ENABLED = process.env.AUTH_DEBUG === '1'

/** First/last 6 chars of a token — enough to correlate, not enough to replay. */
export function tokenFingerprint(token: string | undefined): string | null {
  if (!token) return null
  if (token.length <= 16) return '<short>'
  return `${token.slice(0, 6)}…${token.slice(-6)}(${token.length})`
}

export function isAuthDebugEnabled(): boolean {
  return ENABLED
}

export type AuthDebugEvent = {
  ts: string
  phase: 'request' | 'middleware' | 'response'
  method: string
  path: string
  cookiePresent: boolean
  cookieFp: string | null
  tokenUsable: boolean | null
  middlewareAction: 'pass' | 'strip-forward' | 'clear-browser' | 'skip-no-secret' | 'skip-no-cookie'
  origin: string | null
  referer: string | null
  secFetchSite: string | null
  setCookies?: string[]
  note?: string
}

function emit(event: AuthDebugEvent): void {
  if (!ENABLED) return
  // ponytail: stdout JSON lines — docker logs picks these up verbatim
  console.log(`[auth-debug] ${JSON.stringify(event)}`)
}

export function logAuthRequest(
  request: NextRequest,
  opts: {
    tokenUsable: boolean | null
    middlewareAction: AuthDebugEvent['middlewareAction']
    note?: string
  },
): void {
  const token = request.cookies.get('payload-token')?.value
  emit({
    ts: new Date().toISOString(),
    phase: 'middleware',
    method: request.method,
    path: request.nextUrl.pathname,
    cookiePresent: Boolean(token),
    cookieFp: tokenFingerprint(token),
    tokenUsable: opts.tokenUsable,
    middlewareAction: opts.middlewareAction,
    origin: request.headers.get('origin'),
    referer: request.headers.get('referer'),
    secFetchSite: request.headers.get('sec-fetch-site'),
    note: opts.note,
  })
}

export function logAuthResponse(request: NextRequest, response: NextResponse, note?: string): void {
  if (!ENABLED) return
  const setCookies = response.headers.getSetCookie?.() ?? []
  const sanitized = setCookies.map((c) => {
    const name = c.split('=')[0]
    if (name === 'payload-token') {
      const val = c.match(/payload-token=([^;]*)/)?.[1]
      if (!val || val === '') return 'payload-token=<CLEARED Max-Age=0>'
      return `payload-token=${tokenFingerprint(val)}; …`
    }
    return c.split(';')[0]
  })
  emit({
    ts: new Date().toISOString(),
    phase: 'response',
    method: request.method,
    path: request.nextUrl.pathname,
    cookiePresent: Boolean(request.cookies.get('payload-token')?.value),
    cookieFp: tokenFingerprint(request.cookies.get('payload-token')?.value),
    tokenUsable: null,
    middlewareAction: 'pass',
    origin: request.headers.get('origin'),
    referer: request.headers.get('referer'),
    secFetchSite: request.headers.get('sec-fetch-site'),
    setCookies: sanitized,
    note,
  })
}
