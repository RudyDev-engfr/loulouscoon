import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import {
  getAdminSessionCookieName,
  getAdminSessionSecret,
  isValidAdminCredentials,
} from '@/lib/adminAuth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' })
  }

  const { username, password } = req.body ?? {}

  if (!isValidAdminCredentials(username, password)) {
    return res.status(401).json({ message: 'Identifiants invalides' })
  }

  const cookie = serialize(getAdminSessionCookieName(), getAdminSessionSecret(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 heures
  })

  res.setHeader('Set-Cookie', cookie)
  return res.status(200).json({ message: 'Authentifié' })
}
