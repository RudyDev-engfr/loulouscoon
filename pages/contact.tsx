import Link from 'next/link'
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import Seo from '@/components/molecules/Seo'

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>{icon}</Box>

          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Stack>

        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {children}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact élevage Maine Coon en Charente-Maritime"
        description="Contactez l'élevage Des Loulou Coon's, situé à Arthenac en Charente-Maritime, pour en savoir plus sur nos chatons Maine Coon et nos disponibilités."
        canonical="/contact"
      />

      <Box sx={{ py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Contactez notre élevage Maine Coon
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760, mx: 'auto', lineHeight: 1.9 }}
            >
              Une question, une envie d’en savoir plus sur un chaton Maine Coon, ou simplement le
              souhait de prendre un premier contact avec l’élevage Des Loulou Coon&apos;s ? Situés à
              Arthenac, en Charente-Maritime, nous privilégions les échanges simples, sincères et
              humains autour des chats et de leur future famille.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <InfoCard icon={<EmailOutlinedIcon />} title="Par email">
                  Si vous souhaitez en savoir plus sur un chaton, une portée à venir ou notre façon
                  de faire, vous pouvez nous écrire directement par mail. C’est souvent le moyen le
                  plus simple pour prendre un premier contact tranquillement.
                  <br />
                  <br />
                  <strong>deslouloucoons@outlook.fr</strong>
                </InfoCard>

                <InfoCard icon={<PhoneOutlinedIcon />} title="Par téléphone">
                  Si vous préférez un échange plus direct, il est aussi possible de nous appeler. Un
                  simple appel permet parfois de mieux se comprendre, de parler de votre quotidien,
                  et de voir si un chaton Maine Coon pourrait vraiment correspondre à votre foyer.
                </InfoCard>

                <InfoCard icon={<ChatBubbleOutlineOutlinedIcon />} title="Premier contact">
                  Pour un premier message, il n’y a rien de compliqué à préparer. Vous pouvez
                  simplement vous présenter, raconter un peu votre quotidien, votre foyer, et ce qui
                  vous touche chez le Maine Coon. Cela nous permet déjà de sentir le type de famille
                  que vous êtes.
                </InfoCard>

                <InfoCard icon={<LocationOnOutlinedIcon />} title="Localisation">
                  L’élevage se situe à <strong>17520 Arthenac</strong>, en Charente-Maritime. Cela
                  permet simplement de vous situer un peu géographiquement pour un éventuel échange
                  ou une future visite.
                </InfoCard>

                <InfoCard icon={<FavoriteBorderOutlinedIcon />} title="Notre approche">
                  Ici, on préfère les échanges simples, sincères et respectueux. Le plus important
                  reste toujours le bien-être des chats, et le fait de trouver pour eux une famille
                  sérieuse, douce et réellement investie.
                </InfoCard>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                    Coordonnées de l’élevage
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, lineHeight: 1.8 }}
                  >
                    Vous pouvez prendre contact avec Des Loulou Coon&apos;s de la façon qui vous
                    semble la plus simple. L’essentiel, c’est surtout d’échanger dans de bonnes
                    conditions autour de votre projet d’adoption.
                  </Typography>

                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ letterSpacing: 1, color: 'text.secondary' }}
                      >
                        Email
                      </Typography>

                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        <Link href="mailto:deslouloucoons@outlook.fr">
                          deslouloucoons@outlook.fr
                        </Link>
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ letterSpacing: 1, color: 'text.secondary' }}
                      >
                        Téléphone
                      </Typography>

                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        <Link href="tel:+33671169438">06 71 16 94 38</Link>
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ letterSpacing: 1, color: 'text.secondary' }}
                      >
                        Localisation
                      </Typography>

                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        17520 Arthenac, Charente-Maritime
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
