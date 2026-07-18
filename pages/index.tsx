import type { GetStaticProps } from 'next'
import Head from 'next/head'
import type { Cat } from '../lib/cat'
import { Box, Container, Grid, Typography } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import Seo from '../components/molecules/Seo'
import CatCard from '../components/molecules/CatCard'
import { getKittens, getBreeders, countAdoptedCats } from '../lib/cat.server'
import { getCatSlug } from '../lib/cat'

interface HomePageProps {
  kittens: Cat[]
  recentlyAdoptedKittens: Cat[]
  featuredBreeders: Cat[]
  adoptedCount: number
}

type CatWithDates = Cat & {
  createdAt?: string
  dateOfBirth?: string
  dob?: string
}

const sexLabel = (sex: Cat['sex']) => {
  if (sex === 'Male') return 'Mâle'

  return 'Femelle'
}

const getCatImage = (cat: Cat) => {
  return cat.pictures?.[0] || '/images/placeholder-cat.jpg'
}

const getCatTimestamp = (cat: Cat) => {
  const catWithDates = cat as CatWithDates

  const date = catWithDates.createdAt || catWithDates.dateOfBirth || catWithDates.dob

  if (!date) return 0

  const timestamp = new Date(date).getTime()

  return Number.isNaN(timestamp) ? 0 : timestamp
}

const sortByNewest = (firstCat: Cat, secondCat: Cat) => {
  return getCatTimestamp(secondCat) - getCatTimestamp(firstCat)
}

const HomePage = ({
  kittens,
  recentlyAdoptedKittens,
  featuredBreeders,
  adoptedCount,
}: HomePageProps) => {
  return (
    <>
      <Seo
        title="Élevage Maine Coon en Charente-Maritime"
        description="Des Loulou Coon's est un élevage familial de Maine Coon situé à Arthenac, en Charente-Maritime. Découvrez nos chatons, nos reproducteurs et notre passion pour cette race majestueuse."
        canonical="/"
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: "Des Loulou Coon's",
              image: 'https://louloucoons.fr/images/logo.png',
              url: 'https://louloucoons.fr',
              telephone: '+33671169438',
              email: 'deslouloucoons@outlook.fr',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '8 Chez Bourdet',
                postalCode: '17520',
                addressLocality: 'Arthenac',
                addressCountry: 'FR',
              },
              description: 'Élevage familial de Maine Coon situé à Arthenac en Charente-Maritime.',
            }),
          }}
        />
      </Head>

      <Container>
        <Box my={4} textAlign="center">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Élevage familial de Maine Coon en Charente-Maritime
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 760,
              mx: 'auto',
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            Des Loulou Coon&apos;s est un élevage familial situé à Arthenac, en Charente-Maritime.
            Nous partageons ici nos chatons, nos reproducteurs et notre passion pour le Maine Coon.
          </Typography>

          <PetsIcon sx={{ fontSize: 40, color: '#f50057' }} />

          <Typography
            variant="h2"
            component="p"
            sx={{
              fontSize: '1.2rem',
              mt: 1,
            }}
            gutterBottom
          >
            Chatons ayant trouvé une famille à nos côtés
          </Typography>

          <Typography variant="h4" color="primary">
            {adoptedCount}
          </Typography>
        </Box>

        <Box my={4}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            Nos reproducteurs vedettes
          </Typography>

          <Grid container spacing={4}>
            {featuredBreeders.map(breeder => (
              <Grid item xs={12} sm={6} key={breeder.id}>
                <CatCard
                  catName={breeder.name}
                  catImage={getCatImage(breeder)}
                  catSex={sexLabel(breeder.sex)}
                  catLink={`/chats/${getCatSlug(breeder)}`}
                  availability={breeder.availability}
                  catColors={breeder.colors}
                  catDetails={breeder.details}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box my={4}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            Nos chatons actuellement présentés
          </Typography>

          {kittens.length > 0 ? (
            <Grid container spacing={4}>
              {kittens.map(kitten => (
                <Grid item xs={12} sm={6} md={4} key={kitten.id}>
                  <CatCard
                    catName={kitten.name}
                    catImage={getCatImage(kitten)}
                    catSex={sexLabel(kitten.sex)}
                    catLink={`/chats/${getCatSlug(kitten)}`}
                    availability={kitten.availability}
                    catColors={kitten.colors}
                    catDetails={kitten.details}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              Aucun chaton n&apos;est actuellement présenté.
            </Typography>
          )}
        </Box>

        {recentlyAdoptedKittens.length > 0 && (
          <Box my={6}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            >
              Ils ont récemment trouvé leur famille
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 3,
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Quelques-uns des derniers chatons ayant rejoint leur nouvelle famille.
            </Typography>

            <Grid container spacing={4}>
              {recentlyAdoptedKittens.map(kitten => (
                <Grid item xs={12} sm={6} md={4} key={kitten.id}>
                  <CatCard
                    catName={kitten.name}
                    catImage={getCatImage(kitten)}
                    catSex={sexLabel(kitten.sex)}
                    catLink={`/chats/${getCatSlug(kitten)}`}
                    availability={kitten.availability}
                    catColors={kitten.colors}
                    catDetails={kitten.details}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const allKittens = await getKittens()
    const breeders = await getBreeders()
    const adoptedCount = await countAdoptedCats()

    const availabilityPriority: Record<string, number> = {
      Disponible: 0,
      Réservé: 1,
    }

    const kittens = allKittens
      .filter(kitten => kitten.availability !== 'Adopté')
      .sort((firstKitten, secondKitten) => {
        const firstPriority = availabilityPriority[firstKitten.availability || 'Disponible'] ?? 99

        const secondPriority = availabilityPriority[secondKitten.availability || 'Disponible'] ?? 99

        if (firstPriority !== secondPriority) {
          return firstPriority - secondPriority
        }

        return sortByNewest(firstKitten, secondKitten)
      })
      .slice(0, 6)

    const recentlyAdoptedKittens = allKittens
      .filter(kitten => kitten.availability === 'Adopté')
      .sort(sortByNewest)
      .slice(0, 3)

    const featuredBreeders = [...breeders].sort(sortByNewest).slice(0, 2)

    return {
      props: {
        kittens,
        recentlyAdoptedKittens,
        featuredBreeders,
        adoptedCount,
      },
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)

    return {
      props: {
        kittens: [],
        recentlyAdoptedKittens: [],
        featuredBreeders: [],
        adoptedCount: 61,
      },
    }
  }
}

export default HomePage
