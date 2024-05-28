// pages/index.tsx
import { GetStaticProps } from 'next'
import { Box, Container, Grid, Typography } from '@mui/material'
import CatCard from '@/components/molecules/CatCard'
import PetsIcon from '@mui/icons-material/Pets'

interface Cat {
  id: number
  name: string
  dateOfBirth: string
  sex: 'Male' | 'Female'
  pictures: string[]
  availability: 'Disponible' | 'Réservé' | 'Adopté'
}

interface HomePageProps {
  kittens: Cat[]
  featuredBreeders: Cat[]
  adoptedCount: number
}

const HomePage: React.FC<HomePageProps> = ({ kittens, featuredBreeders, adoptedCount }) => {
  return (
    <Container>
      {/* Section Nombre de chatons adoptés */}
      <Box my={4} textAlign="center">
        <PetsIcon sx={{ fontSize: 40, color: '#f50057' }} />
        <Typography variant="h6" gutterBottom>
          Chatons ayant trouvé une famille à nos côtés
        </Typography>
        <Typography variant="h4" color="primary">
          {adoptedCount}
        </Typography>
      </Box>

      {/* Section Reproducteurs vedettes */}
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Nos Reproducteurs Vedettes
        </Typography>
        <Grid container spacing={4}>
          {featuredBreeders.map(breeder => (
            <Grid item xs={12} sm={6} key={breeder.id}>
              <CatCard
                catName={breeder.name}
                catImage={breeder.pictures[0] ?? ''}
                catSex={breeder.sex}
                catLink={`/chats/${breeder.name.toLowerCase().replace(/\s+/g, '-')}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Section Derniers chatons en date */}
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Derniers Chatons en Date
        </Typography>
        <Grid container spacing={4}>
          {kittens.map(kitten => (
            <Grid item xs={12} sm={6} md={4} key={kitten.id}>
              <CatCard
                catName={kitten.name}
                catImage={kitten.pictures[0] ?? ''}
                catSex={kitten.sex}
                catLink={`/chats/${kitten.name.toLowerCase().replace(/\s+/g, '-')}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const kittensResponse = await fetch('http://localhost:4000/cats?type=kitten')
    const breedersResponse = await fetch('http://localhost:4000/cats?type=breeder')
    const adoptedCountResponse = await fetch('http://localhost:3000/api/countAdoptedCats')

    const kittens = await kittensResponse.json()
    const breeders = await breedersResponse.json()
    const { adoptedCount } = await adoptedCountResponse.json()

    console.log('Kittens:', kittens)
    console.log('Breeders:', breeders)
    console.log('Adopted count:', adoptedCount)

    // Sélectionnez les reproducteurs vedettes (maman et papa vedettes)
    const featuredBreeders = breeders.slice(0, 2) // Vous pouvez changer la logique de sélection

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
        adoptedCount: 61, // Valeur par défaut en cas d'erreur
      },
    }
  }
}

export default HomePage
