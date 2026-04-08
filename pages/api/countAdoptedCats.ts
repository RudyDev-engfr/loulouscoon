import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const INITIAL_ADOPTED_COUNT = 61

interface Cat {
  availability?: string | null
}

interface Database {
  cats: Cat[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'db.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const db: Database = JSON.parse(fileContent)

    const cats = Array.isArray(db.cats) ? db.cats : []

    const adoptedCount = cats.filter(cat => cat.availability === 'Adopté').length

    res.status(200).json({ adoptedCount: adoptedCount + INITIAL_ADOPTED_COUNT })
  } catch (error) {
    console.error('Error reading adopted cats count:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
}
