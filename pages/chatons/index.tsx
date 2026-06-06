import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Seo from '@/components/molecules/Seo'
import CatCard from '@/components/molecules/CatCard'
import { getCatSlug, type Cat } from '@/lib/cat'
import { getKittens } from '@/lib/cat.server'

interface ChatonsPageProps {
  kittens: Cat[]
}

const sexLabel = (sex: Cat['sex']) => {
  if (sex === 'Male') return 'Mâle'
  return 'Femelle'
}

const getCatImage = (cat: Cat) => {
  return cat.pictures?.[0] || '/images/placeholder-cat.jpg'
}

const normalizeAvailability = (availability?: Cat['availability']) => {
  return availability
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function ChatonsPage({ kittens }: ChatonsPageProps) {
  const availableKittens = kittens.filter(
    kitten => normalizeAvailability(kitten.availability) === 'disponible'
  )

  const reservedKittens = kittens.filter(
    kitten => normalizeAvailability(kitten.availability) === 'reserve'
  )

  const otherKittens = kittens.filter(kitten => {
    const availability = normalizeAvailability(kitten.availability)
    return availability !== 'disponible' && availability !== 'reserve'
  })

  const hasKittens = kittens.length > 0

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

          {hasKittens ? (
            <>
              {availableKittens.length > 0 && (
                <Box sx={{ mb: { xs: 6, md: 8 } }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.6rem', md: '2.1rem' },
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    Chatons disponibles
                  </Typography>

                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Ces chatons peuvent encore rejoindre une famille.
                  </Typography>

                  <Grid container spacing={4}>
                    {availableKittens.map(cat => (
                      <Grid item xs={12} sm={6} md={4} key={cat.id}>
                        <CatCard
                          catName={cat.name}
                          catImage={getCatImage(cat)}
                          catSex={sexLabel(cat.sex)}
                          catLink={`/chats/${getCatSlug(cat)}`}
                          availability={cat.availability}
                          catColors={cat.colors}
                          catDetails={cat.details}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {otherKittens.length > 0 && (
                <Box sx={{ mb: { xs: 6, md: 8 } }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.6rem', md: '2.1rem' },
                      fontWeight: 700,
                      mb: 3,
                    }}
                  >
                    Autres chatons
                  </Typography>

                  <Grid container spacing={4}>
                    {otherKittens.map(cat => (
                      <Grid item xs={12} sm={6} md={4} key={cat.id}>
                        <CatCard
                          catName={cat.name}
                          catImage={getCatImage(cat)}
                          catSex={sexLabel(cat.sex)}
                          catLink={`/chats/${getCatSlug(cat)}`}
                          availability={cat.availability}
                          catColors={cat.colors}
                          catDetails={cat.details}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {reservedKittens.length > 0 && (
                <Box sx={{ mb: { xs: 6, md: 8 } }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.6rem', md: '2.1rem' },
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    Chatons déjà réservés
                  </Typography>

                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Ils ont déjà trouvé leur future famille.
                  </Typography>

                  <Grid container spacing={4}>
                    {reservedKittens.map(cat => (
                      <Grid item xs={12} sm={6} md={4} key={cat.id}>
                        <CatCard
                          catName={cat.name}
                          catImage={getCatImage(cat)}
                          catSex={sexLabel(cat.sex)}
                          catLink={`/chats/${getCatSlug(cat)}`}
                          availability={cat.availability}
                          catColors={cat.colors}
                          catDetails={cat.details}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </>
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
