import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import type { UpcomingBirth } from '@/lib/upcomingBirth'

interface Database {
  cats?: unknown[]
  upcomingBirth?: UpcomingBirth | null
  [key: string]: unknown
}

const databasePath = path.join(process.cwd(), 'src', 'data', 'db.json')

const readDatabase = async (): Promise<Database> => {
  const fileContent = await fs.readFile(databasePath, 'utf8')
  return JSON.parse(fileContent) as Database
}

const writeDatabase = async (database: Database) => {
  await fs.writeFile(databasePath, JSON.stringify(database, null, 2), 'utf8')
}

const normalizeString = (value: unknown) => {
  return typeof value === 'string' ? value.trim() : ''
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const database = await readDatabase()

      return res.status(200).json({
        upcomingBirth: database.upcomingBirth ?? null,
      })
    }

    if (!isAdminAuthenticated(req)) {
      return res.status(401).json({
        message: 'Authentification requise.',
      })
    }

    if (req.method === 'PUT') {
      const motherId = normalizeString(req.body?.motherId)
      const fatherId = normalizeString(req.body?.fatherId)
      const expectedDate = normalizeString(req.body?.expectedDate)
      const status = normalizeString(req.body?.status)
      const note = normalizeString(req.body?.note)

      if (!motherId || !fatherId) {
        return res.status(400).json({
          message: 'La mère et le père doivent être sélectionnés.',
        })
      }

      if (motherId === fatherId) {
        return res.status(400).json({
          message: 'La mère et le père doivent être deux chats différents.',
        })
      }

      const database = await readDatabase()
      const cats = Array.isArray(database.cats) ? database.cats : []

      const mother = cats.find(cat => {
        if (typeof cat !== 'object' || cat === null || !('id' in cat)) {
          return false
        }

        return String(cat.id) === motherId
      })

      const father = cats.find(cat => {
        if (typeof cat !== 'object' || cat === null || !('id' in cat)) {
          return false
        }

        return String(cat.id) === fatherId
      })

      if (!mother || !father) {
        return res.status(400).json({
          message: 'Un des reproducteurs sélectionnés est introuvable.',
        })
      }

      const upcomingBirth: UpcomingBirth = {
        motherId,
        fatherId,
        expectedDate,
        status,
        note,
      }

      database.upcomingBirth = upcomingBirth

      await writeDatabase(database)

      return res.status(200).json({
        message: 'La naissance à venir a été enregistrée.',
        upcomingBirth,
      })
    }

    if (req.method === 'DELETE') {
      const database = await readDatabase()

      database.upcomingBirth = null

      await writeDatabase(database)

      return res.status(200).json({
        message: 'L’annonce a été retirée.',
      })
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])

    return res.status(405).json({
      message: `Méthode ${req.method} non autorisée.`,
    })
  } catch (error) {
    console.error('upcomingBirth API error:', error)

    return res.status(500).json({
      message: 'Une erreur est survenue pendant la gestion de la naissance à venir.',
    })
  }
}
