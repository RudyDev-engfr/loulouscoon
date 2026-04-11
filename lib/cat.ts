export type CatType = 'kitten' | 'breeder'

export type CatAvailability = 'Disponible' | 'Réservé' | 'Adopté'

export interface Cat {
  id: string
  name: string
  dateOfBirth?: string
  sex: 'Male' | 'Female'
  type: CatType
  colors?: string[]
  details?: string
  pictures: string[]
  availability?: CatAvailability | null
  litterId?: string
}

export interface LitterGroup {
  litterId: string
  title: string
  kittens: Cat[]
}

export interface Litter {
  id: string
  fatherId: string
  motherId: string
  birthDate: string
  title: string
}

export interface LitterWithKittens {
  id: string
  title: string
  birthDate: string
  father: Cat | undefined
  mother: Cat | undefined
  kittens: Cat[]
}

export function slugifyCatName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export function getCatSlug(cat: Pick<Cat, 'name' | 'id'>) {
  return `${slugifyCatName(cat.name)}-${cat.id}`
}
