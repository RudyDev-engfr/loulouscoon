import { GetServerSideProps } from 'next'
import Link from 'next/link'
import {
  Box,
  Button,
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

interface Cat {
  id: string
  name: string
  dateOfBirth?: string
  sex: 'Male' | 'Female'
  type: 'kitten' | 'breeder'
  colors?: string[]
  details?: string
  pictures: string[]
  availability?: string
}

interface CatsPageProps {
  breeders: Cat[]
  kittens: Cat[]
}

const sexLabel = (sex: Cat['sex']) => {
  if (sex === 'Male') return 'Mâle'
  return 'Femelle'
}

function CatCard({ cat }: { cat: Cat }) {
  const slug = cat.name.toLowerCase().replace(/\s+/g, '-')
  const image = cat.pictures?.[0] || '/images/placeholder-cat.jpg'

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

          {cat.colors && cat.colors.length > 0 && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              {cat.colors.join(' • ')}
            </Typography>
          )}

          {cat.availability && (
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h4"
      sx={{
        mb: 3,
        fontWeight: 600,
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      {children}
    </Typography>
  )
}

export default function CatsPage({ breeders, kittens }: CatsPageProps) {
  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Nos Chats
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 760, mx: 'auto', lineHeight: 1.8 }}
          >
            Découvrez nos reproducteurs et les chatons actuellement présentés à l’élevage. Chaque
            fiche permet d’en apprendre davantage sur leur caractère, leurs couleurs et leur
            disponibilité.
          </Typography>
        </Box>

        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <SectionTitle>Nos Reproducteurs</SectionTitle>
          <Grid container spacing={4}>
            {breeders.map(cat => (
              <Grid item xs={12} sm={6} md={4} key={cat.id}>
                <CatCard cat={cat} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <SectionTitle>Nos Chatons</SectionTitle>
          <Grid container spacing={4}>
            {kittens.map(cat => (
              <Grid item xs={12} sm={6} md={4} key={cat.id}>
                <CatCard cat={cat} />
              </Grid>
            ))}
          </Grid>

          {kittens.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="body1" color="text.secondary" mb={2}>
                Aucun chaton n’est affiché pour le moment.
              </Typography>
              <Button component={Link} href="/contact" variant="contained" size="large">
                Nous contacter
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<CatsPageProps> = async () => {
  try {
    const response = await fetch('http://localhost:4000/cats')
    const cats: Cat[] = await response.json()

    const breeders = cats.filter(cat => cat.type === 'breeder')
    const kittens = cats.filter(cat => cat.type === 'kitten')

    return {
      props: {
        breeders,
        kittens,
      },
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des chats :', error)

    return {
      props: {
        breeders: [],
        kittens: [],
      },
    }
  }
}
