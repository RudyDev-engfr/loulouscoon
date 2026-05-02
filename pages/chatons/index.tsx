import type { GetServerSideProps } from 'next'
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
import Seo from '@/components/molecules/Seo'
import { getCatSlug, type Cat } from '@/lib/cat'
import { getKittens } from '@/lib/cat.server'

interface ChatonsPageProps {
  kittens: Cat[]
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
          alt={`Photo de ${cat.name}, chaton Maine Coon ${sexLabel(cat.sex).toLowerCase()}`}
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
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              {cat.name}
            </Typography>

            <Chip label={sexLabel(cat.sex)} size="small" />
          </Stack>

          {displayColors && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              {displayColors}
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

export default function ChatonsPage({ kittens }: ChatonsPageProps) {
  return (
    <>
      <Seo
        title="Chatons Maine Coon disponibles"
        description="Découvrez les chatons Maine Coon de l'élevage Des Loulou Coon's, élevés avec attention à Arthenac en Charente-Maritime."
        canonical="/chatons"
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
              Nos chatons Maine Coon
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760, mx: 'auto', lineHeight: 1.8 }}
            >
              Découvrez les chatons Maine Coon de notre élevage familial situé à Arthenac, en
              Charente-Maritime. Chaque chaton est présenté avec ses couleurs, sa personnalité et sa
              disponibilité afin d’accompagner au mieux les familles dans leur projet d’adoption.
            </Typography>
          </Box>

          {kittens.length > 0 ? (
            <Grid container spacing={4}>
              {kittens.map(cat => (
                <Grid item xs={12} sm={6} md={4} key={cat.id}>
                  <CatCard cat={cat} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h2" component="h2" sx={{ fontSize: '1.6rem', mb: 2 }}>
                Aucun chaton affiché pour le moment
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={2}>
                Aucun chaton n’est actuellement présenté sur le site. Vous pouvez contacter
                l’élevage pour en savoir plus sur les prochaines portées ou les disponibilités à
                venir.
              </Typography>

              <Button component={Link} href="/contact" variant="contained" size="large">
                Nous contacter
              </Button>
            </Box>
          )}

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
              Vous souhaitez adopter un chaton Maine Coon ?
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760, mx: 'auto', lineHeight: 1.8, mb: 3 }}
            >
              Pour toute demande de réservation ou d’information, l’élevage Des Loulou Coon&apos;s
              vous accompagne dans les différentes étapes : présentation des chatons, contrat de
              réservation, attestation d’engagement et préparation du départ dans la future famille.
            </Typography>

            <Button component={Link} href="/contact" variant="contained" size="large">
              Contacter l’élevage
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ChatonsPageProps> = async () => {
  try {
    const kittens = await getKittens()

    return {
      props: {
        kittens,
      },
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des chatons :', error)

    return {
      props: {
        kittens: [],
      },
    }
  }
}
