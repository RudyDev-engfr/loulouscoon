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

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Méthode non autorisée' })
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'db.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const db: Database = JSON.parse(fileContent)

    const rawId = req.query.id
    const id = Array.isArray(rawId) ? rawId[0] : rawId

    if (!id) {
      return res.status(400).json({ message: 'ID manquant' })
    }

    const catExists = db.cats.some(cat => cat.id === id)

    if (!catExists) {
      return res.status(404).json({ message: 'Chat introuvable' })
    }

    const updatedDb: Database = {
      ...db,
      cats: db.cats.filter(cat => cat.id !== id),
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedDb, null, 2), 'utf-8')

    return res.status(200).json({ message: 'Chat supprimé', id })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erreur serveur' })
  }
}
