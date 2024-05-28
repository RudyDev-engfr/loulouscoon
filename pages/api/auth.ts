// pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // Définir des cookies pour stocker les identifiants
      setCookie({ res }, 'username', username, {
        maxAge: 30 * 24 * 60 * 60, // 30 jours
        path: '/',
      })
      setCookie({ res }, 'password', password, {
        maxAge: 30 * 24 * 60 * 60, // 30 jours
        path: '/',
      })
      res.status(200).json({ message: 'Authentifié avec succès' })
    } else {
      res.status(401).json({ message: 'Identifiants incorrects' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Méthode ${req.method} non autorisée`)
  }
}
