import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
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
  availability?: CatAvailability
  price?: number | null
  vaccines?: {
    vaccineName?: string | null
    dateGiven?: string | null
  }[]
  chip?: {
    number?: string | null
    dateInserted?: string | null
  } | null
  colors?: string[]
  details?: string
  pictures?: string[]
}

interface Database {
  cats: Cat[]
}

const slugify = (value: string): string => {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ message: 'Non autorisé' })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'db.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const db: Database = JSON.parse(fileContent)

    const catData = req.body || {}

    const type: CatType = catData.type === 'breeder' ? 'breeder' : 'kitten'

    const availability: CatAvailability =
      catData.availability === 'Réservé' || catData.availability === 'Adopté'
        ? catData.availability
        : 'Disponible'

    if (!catData.name || typeof catData.name !== 'string') {
      return res.status(400).json({
        message: 'Le nom du chat est obligatoire',
      })
    }

    if (catData.sex !== 'Male' && catData.sex !== 'Female') {
      return res.status(400).json({
        message: 'Le sexe du chat est invalide',
      })
    }

    const newCat: Cat = {
      id: crypto.randomUUID(),
      name: catData.name.trim(),
      slug: catData.slug || slugify(catData.name),
      dateOfBirth: catData.dateOfBirth || '',
      sex: catData.sex,
      type,
      availability,
      price: normalizePrice(catData.price, type, availability),
      vaccines: Array.isArray(catData.vaccines) ? catData.vaccines : [],
      chip: catData.chip || null,
      colors: Array.isArray(catData.colors) ? catData.colors : [],
      details: typeof catData.details === 'string' ? catData.details : '',
      pictures: Array.isArray(catData.pictures) ? catData.pictures : [],
    }

    db.cats.push(newCat)

    fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf-8')

    return res.status(201).json(newCat)
  } catch (error: unknown) {
    console.error('Erreur addCat :', error)

    const message = error instanceof Error ? error.message : 'Une erreur est survenue'

    return res.status(500).json({ message })
  }
}

export default handler
