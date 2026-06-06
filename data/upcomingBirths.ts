export type UpcomingBirth = {
  motherSlug: string
  fatherSlug: string
  expectedDate: string
  status: string
  note?: string
}

export const upcomingBirths: UpcomingBirth[] = [
  {
    motherSlug: 'salameche',
    fatherSlug: 'atila',
    expectedDate: 'Juin 2026',
    status: 'Naissance à venir',
    note: 'Une belle portée est espérée entre Atila et Salameche.',
  },
]
