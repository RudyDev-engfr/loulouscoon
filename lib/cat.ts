export type CatType = 'kitten' | 'breeder'

export type CatAvailability = 'available' | 'reserved' | 'adopted'

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
}

export function getCatSlug(cat: Pick<Cat, 'name' | 'id'>) {
  return `${cat.name}-${cat.id}`.toLowerCase().replace(/\s+/g, '-')
}
