import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { getAdminSessionCookieName } from '@/lib/adminAuth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' })
  }

  const cookie = serialize(getAdminSessionCookieName(), '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  })

  res.setHeader('Set-Cookie', cookie)
  return res.status(200).json({ message: 'Déconnecté' })
}
