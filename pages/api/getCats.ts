import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { isAdminAuthenticated } from '@/lib/adminAuth'

interface Cat {
  id: string
  name: string
  dateOfBirth?: string
  sex: 'Male' | 'Female'
  type: 'kitten' | 'breeder'
  colors: string[]
  details?: string
  pictures: string[]
  availability?: string
}

interface Database {
  cats: Cat[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ message: 'Non autorisé' })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' })
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'db.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const db: Database = JSON.parse(fileContent)

    return res.status(200).json(db.cats)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erreur serveur' })
  }
}
