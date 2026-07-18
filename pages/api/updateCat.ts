import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { isAdminAuthenticated } from '@/lib/adminAuth'

type CatType = 'kitten' | 'breeder'
type CatAvailability = 'Disponible' | 'Réservé' | 'Adopté'

interface Cat {
  id: string
  name: string
  slug?: string
  dateOfBirth?: string
  sex: 'Male' | 'Female'
  type: CatType
  colors: string[]
  details?: string
  pictures: string[]
  availability?: CatAvailability
  price?: number | null
}

interface Database {
  cats: Cat[]
}

const normalizePrice = (
  value: unknown,
  type: CatType,
  availability: CatAvailability
): number | null => {
  if (type !== 'kitten' || availability === 'Adopté') {
    return null
  }

  if (value === null || value === undefined || value === '') {
    return null
  }

  const price = Number(value)

  if (!Number.isFinite(price) || price < 0) {
    return null
  }

  return Math.round(price)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ message: 'Non autorisé' })
  }

  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT'])

    return res.status(405).json({
      message: 'Méthode non autorisée',
    })
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'db.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const db: Database = JSON.parse(fileContent)

    const { id, name, dateOfBirth, sex, type, colors, details, pictures, availability, price } =
      req.body || {}

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        message: 'Identifiant du chat manquant',
      })
    }

    const catIndex = db.cats.findIndex(cat => cat.id === id)

    if (catIndex === -1) {
      return res.status(404).json({
        message: 'Chat introuvable',
      })
    }

    const currentCat = db.cats[catIndex]

    const updatedType: CatType = type === 'breeder' || type === 'kitten' ? type : currentCat.type

    const updatedAvailability: CatAvailability =
      availability === 'Disponible' || availability === 'Réservé' || availability === 'Adopté'
        ? availability
        : currentCat.availability || 'Disponible'

    if (sex !== undefined && sex !== 'Male' && sex !== 'Female') {
      return res.status(400).json({
        message: 'Le sexe du chat est invalide',
      })
    }

    db.cats[catIndex] = {
      ...currentCat,

      name: typeof name === 'string' ? name.trim() : currentCat.name,

      dateOfBirth: typeof dateOfBirth === 'string' ? dateOfBirth : currentCat.dateOfBirth,

      sex: sex === 'Male' || sex === 'Female' ? sex : currentCat.sex,

      type: updatedType,

      availability: updatedAvailability,

      price: normalizePrice(price, updatedType, updatedAvailability),

      colors: Array.isArray(colors) ? colors : currentCat.colors,

      details: typeof details === 'string' ? details : currentCat.details,

      pictures: Array.isArray(pictures) ? pictures : currentCat.pictures,
    }

    fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf-8')

    return res.status(200).json(db.cats[catIndex])
  } catch (error: unknown) {
    console.error('Erreur updateCat :', error)

    const message = error instanceof Error ? error.message : 'Erreur serveur'

    return res.status(500).json({ message })
  }
}
