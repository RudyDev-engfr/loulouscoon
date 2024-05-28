// pages/api/addCat.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const catData = req.body

    try {
      const response = await fetch('http://localhost:4000/cats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catData),
      })

      if (!response.ok) {
        throw new Error('Failed to add cat')
      }

      const data = await response.json()
      return res.status(201).json(data)
    } catch (error: any) {
      return res.status(500).json({ message: error.message || 'Something went wrong' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
