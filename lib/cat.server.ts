import { promises as fs } from 'fs'
import path from 'path'
import type { Cat, Litter, LitterWithKittens } from './cat'
import { getCatSlug } from './cat'

const dataFilePath = path.join(process.cwd(), 'data', 'db.json')
interface Database {
  cats: Cat[]
  litters: Litter[]
}

async function readDatabase(): Promise<Database> {
  const raw = await fs.readFile(dataFilePath, 'utf8')
  const data = JSON.parse(raw)

  return {
    cats: data.cats ?? [],
    litters: data.litters ?? [],
  }
}

async function readCatsFile(): Promise<Cat[]> {
  const data = await readDatabase()
  return data.cats
}

export async function getCats(): Promise<Cat[]> {
  return readCatsFile()
}

export async function getBreeders(): Promise<Cat[]> {
  const cats = await readCatsFile()
  return cats.filter(cat => cat.type === 'breeder')
}

export async function getKittens(): Promise<Cat[]> {
  const cats = await readCatsFile()
  return cats.filter(cat => cat.type === 'kitten')
}

export async function getCatBySlug(slug: string): Promise<Cat | null> {
  const cats = await readCatsFile()
  return cats.find(cat => getCatSlug(cat) === slug.toLowerCase()) ?? null
}

function normalizeAvailability(value?: string | null) {
  return value
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export async function countAdoptedCats(): Promise<number> {
  const cats = await readCatsFile()

  return cats.filter(cat => normalizeAvailability(cat.availability) === 'adopte').length
}

export async function getLitterGroups(): Promise<LitterWithKittens[]> {
  const { cats, litters } = await readDatabase()

  return litters
    .map(litter => {
      const father = cats.find(cat => cat.id === litter.fatherId)
      const mother = cats.find(cat => cat.id === litter.motherId)
      const kittens = cats.filter(cat => cat.type === 'kitten' && cat.litterId === litter.id)

      return {
        id: litter.id,
        title: litter.title,
        birthDate: litter.birthDate,
        father,
        mother,
        kittens,
      }
    })
    .filter(litter => litter.kittens.length > 0)
}
