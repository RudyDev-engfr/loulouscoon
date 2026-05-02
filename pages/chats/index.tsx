import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
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
import Seo from '@/components/molecules/Seo'
import { getCatSlug, type Cat } from '../../lib/cat'
import { getBreeders } from '../../lib/cat.server'

interface CatsPageProps {
  breeders: Cat[]
}

const sexLabel = (sex: Cat['sex']) => {
  if (sex === 'Male') return 'Mâle'
  return 'Femelle'
}

function CatCard({ cat }: { cat: Cat }) {
  const slug = getCatSlug(cat)
  const image = cat.pictures?.[0] || '/images/placeholder-cat.jpg'
  const displayColors = Array.isArray(cat.colors) ? cat.colors.join(' • ') : cat.colors || ''

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
          alt={`Photo de ${cat.name}, Maine Coon ${sexLabel(cat.sex).toLowerCase()} reproducteur`}
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

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="h4"
      component="h2"
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

export default function CatsPage({ breeders }: CatsPageProps) {
  return (
    <>
      <Seo
        title="Nos reproducteurs Maine Coon"
        description="Découvrez les reproducteurs Maine Coon de l'élevage Des Loulou Coon's, situé à Arthenac en Charente-Maritime."
        canonical="/chats"
      />

      <Box sx={{ py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Nos reproducteurs Maine Coon
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760, mx: 'auto', lineHeight: 1.8 }}
            >
              Découvrez les reproducteurs Maine Coon de notre élevage familial situé à Arthenac, en
              Charente-Maritime. Chaque mâle et femelle présenté sur cette page fait partie de
              l’univers Des Loulou Coon&apos;s et contribue à la vie de l’élevage.
            </Typography>
          </Box>

          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <SectionTitle>Les chats de l’élevage</SectionTitle>

            {breeders.length > 0 ? (
              <Grid container spacing={4}>
                {breeders.map(cat => (
                  <Grid item xs={12} sm={6} md={4} key={cat.id}>
                    <CatCard cat={cat} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1" color="text.secondary">
                  Aucun reproducteur n’est affiché pour le moment.
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Un élevage familial avant tout
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760, mx: 'auto', lineHeight: 1.8 }}
            >
              Chez Des Loulou Coon&apos;s, nos Maine Coon évoluent dans un environnement familial,
              avec une attention particulière portée à leur bien-être, leur caractère et leur
              équilibre. Cette proximité permet de mieux connaître chaque chat et d’accompagner les
              futures familles avec sérieux et transparence.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<CatsPageProps> = async () => {
  try {
    const breeders = await getBreeders()

    return {
      props: {
        breeders,
      },
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des reproducteurs :', error)

    return {
      props: {
        breeders: [],
      },
    }
  }
}
