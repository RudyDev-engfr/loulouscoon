// pages/api/countAdoptedCats.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const INITIAL_ADOPTED_COUNT = 61

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const catsResponse = await fetch('http://localhost:4000/cats')
    const cats = await catsResponse.json()

    const adoptedCount = cats.filter(
      (cat: { availability: string }) => cat.availability === 'Adopté'
    ).length

    console.log('Adopted count from cats:', adoptedCount)

    res.status(200).json({ adoptedCount: adoptedCount + INITIAL_ADOPTED_COUNT })
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
}
