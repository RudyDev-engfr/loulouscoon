import type { GetStaticProps } from 'next'
import Head from 'next/head'
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
  const catTypeLabel = isKitten ? 'chaton Maine Coon' : 'Maine Coon reproducteur'

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
          alt={`Photo de ${cat.name}, ${catTypeLabel} ${sexLabel(cat.sex).toLowerCase()}`}
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
            <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
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
            sx={{ maxWidth: 760, mx: 'auto', lineHeight: 1.8, mb: 4 }}
          >
            Des Loulou Coon&apos;s est un élevage familial situé à Arthenac, en Charente-Maritime.
            Nous partageons ici nos chatons, nos reproducteurs et notre passion pour le Maine Coon.
          </Typography>

          <PetsIcon sx={{ fontSize: 40, color: '#f50057' }} />

          <Typography variant="h2" component="p" sx={{ fontSize: '1.2rem', mt: 1 }} gutterBottom>
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
                <CatCard cat={breeder} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Derniers chatons présentés
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
