import type { NextApiRequest } from 'next'
import type { IncomingMessage } from 'http'

type RequestLike =
  | NextApiRequest
  | (IncomingMessage & { cookies?: Partial<Record<string, string>> })

const ADMIN_SESSION_COOKIE = 'admin_session'

export function isValidAdminCredentials(username?: string, password?: string): boolean {
  return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD
}

export function getAdminSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is missing')
  }

  return secret
}

export function isAdminAuthenticated(req: RequestLike): boolean {
  const sessionCookie = req.cookies?.[ADMIN_SESSION_COOKIE]
  return sessionCookie === getAdminSessionSecret()
}

export function getAdminSessionCookieName(): string {
  return ADMIN_SESSION_COOKIE
}
