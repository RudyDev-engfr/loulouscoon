import type { GetStaticProps } from 'next'
import type { Cat } from '../lib/cat'
import { Box, Container, Grid, Typography } from '@mui/material'
import CatCard from '@/components/molecules/CatCard'
import PetsIcon from '@mui/icons-material/Pets'
import { getKittens, getBreeders, countAdoptedCats } from '../lib/cat.server'
import { getCatSlug } from '../lib/cat'

interface HomePageProps {
  kittens: Cat[]
  featuredBreeders: Cat[]
  adoptedCount: number
}

const HomePage = ({ kittens, featuredBreeders, adoptedCount }: HomePageProps) => {
  return (
    <Container>
      <Box my={4} textAlign="center">
        <PetsIcon sx={{ fontSize: 40, color: '#f50057' }} />
        <Typography variant="h6" gutterBottom>
          Chatons ayant trouvé une famille à nos côtés
        </Typography>
        <Typography variant="h4" color="primary">
          {adoptedCount}
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          Nos Reproducteurs Vedettes
        </Typography>

        <Grid container spacing={4}>
          {featuredBreeders.map(breeder => (
            <Grid item xs={12} sm={6} key={breeder.id}>
              <CatCard
                catName={breeder.name}
                catImage={breeder.pictures?.[0] ?? ''}
                catSex={breeder.sex}
                catLink={`/chats/${getCatSlug(breeder)}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Derniers Chatons en Date
        </Typography>
        <Grid container spacing={4}>
          {kittens.map(kitten => (
            <Grid item xs={12} sm={6} md={4} key={kitten.id}>
              <CatCard
                catName={kitten.name}
                catImage={kitten.pictures?.[0] ?? ''}
                catSex={kitten.sex}
                catLink={`/chats/${getCatSlug(kitten)}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const kittens = await getKittens()
    const breeders = await getBreeders()
    const adoptedCount = await countAdoptedCats()

    const featuredBreeders = breeders.slice(0, 2)

    return {
      props: {
        kittens,
        featuredBreeders,
        adoptedCount,
      },
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)

    return {
      props: {
        kittens: [],
        featuredBreeders: [],
        adoptedCount: 61,
      },
    }
  }
}

export default HomePage
