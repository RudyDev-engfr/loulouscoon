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

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Méthode non autorisée' })
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'db.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const db: Database = JSON.parse(fileContent)

    const { id, ...updatedFields } = req.body

    const catIndex = db.cats.findIndex(cat => cat.id === id)

    if (catIndex === -1) {
      return res.status(404).json({ message: 'Chat introuvable' })
    }

    db.cats[catIndex] = {
      ...db.cats[catIndex],
      ...updatedFields,
      colors: Array.isArray(updatedFields.colors) ? updatedFields.colors : db.cats[catIndex].colors,
      pictures: Array.isArray(updatedFields.pictures)
        ? updatedFields.pictures
        : db.cats[catIndex].pictures,
    }

    fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf-8')

    return res.status(200).json(db.cats[catIndex])
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erreur serveur' })
  }
}
