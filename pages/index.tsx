import type { GetStaticProps } from 'next'
import Link from 'next/link'
import type { Cat } from '../lib/cat'
import {
  Box,
  Chip,
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import Seo from '../components/molecules/Seo'
import { getKittens, getBreeders, countAdoptedCats } from '../lib/cat.server'
import { getCatSlug } from '../lib/cat'

interface HomePageProps {
  kittens: Cat[]
  featuredBreeders: Cat[]
  adoptedCount: number
}

const sexLabel = (sex: Cat['sex']) => {
  if (sex === 'Male') return 'Mâle'
  return 'Femelle'
}

function CatCard({ cat }: { cat: Cat }) {
  const slug = getCatSlug(cat)
  const image = cat.pictures?.[0] || '/images/placeholder-cat.jpg'
  const displayColors = Array.isArray(cat.colors) ? cat.colors.join(' • ') : cat.colors || ''
  const isKitten = cat.type === 'kitten'

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      }}
    >
      <CardActionArea component={Link} href={`/chats/${slug}`} sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          image={image}
          alt={cat.name}
          sx={{
            height: { xs: 260, sm: 320 },
            objectFit: 'cover',
          }}
        />

        <CardContent sx={{ p: 2.5 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1.5}
            gap={1}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {cat.name}
            </Typography>
            <Chip label={sexLabel(cat.sex)} size="small" />
          </Stack>

          {displayColors && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              {displayColors}
            </Typography>
          )}

          {isKitten && cat.availability && (
            <Typography
              variant="body2"
              sx={{
                mb: 1.5,
                fontWeight: 600,
              }}
            >
              {cat.availability}
            </Typography>
          )}

          {cat.details && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {cat.details}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const HomePage = ({ kittens, featuredBreeders, adoptedCount }: HomePageProps) => {
  return (
    <>
      <Seo
        title="Élevage Maine Coon en Charente-Maritime"
        description="Des Loulou Coon's est un élevage familial de Maine Coon situé à Arthenac, en Charente-Maritime. Découvrez nos chatons, nos reproducteurs et notre passion pour cette race majestueuse."
        canonical="/"
      />
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
                <CatCard cat={breeder} />
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
                <CatCard cat={kitten} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
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
