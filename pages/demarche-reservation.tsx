// pages/demarche-reservation.tsx

import { Box, Button, Container, Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import DownloadIcon from '@mui/icons-material/Download'
import PetsIcon from '@mui/icons-material/Pets'
import Seo from '@/components/molecules/Seo'

export default function DemarcheReservationPage() {
  return (
    <>
      <Seo
        title="Démarche de réservation d’un chaton Maine Coon"
        description="Découvrez les étapes pour réserver un chaton Maine Coon auprès de l'élevage Des Loulou Coon's : contrat de réservation, attestation d'engagement, acompte et départ du chaton."
        canonical="/demarche-reservation"
      />

      <Container maxWidth="md">
        <Box py={{ xs: 4, md: 6 }}>
          <Stack spacing={4} alignItems="center" textAlign="center">
            <PetsIcon sx={{ fontSize: 52, color: '#8b6f5c' }} />

            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                Démarche de réservation d’un chaton Maine Coon
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Vous souhaitez réserver l’un de nos chatons ? Voici les étapes à suivre afin que
                votre demande soit prise en compte dans les meilleures conditions auprès de
                l’élevage Des Loulou Coon&apos;s.
              </Typography>
            </Box>

            <Box
              sx={{
                background: 'linear-gradient(135deg, #fffaf5 0%, #f7efe7 100%)',
                borderRadius: 5,
                p: { xs: 3, sm: 4 },
                width: '100%',
                textAlign: 'left',
                border: '1px solid rgba(139, 111, 92, 0.18)',
                boxShadow: '0 18px 40px rgba(80, 55, 35, 0.08)',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom textAlign="center">
                Les étapes de réservation
              </Typography>

              <Stack spacing={3} mt={3}>
                <Box>
                  <Typography variant="subtitle1" component="h3" fontWeight={700}>
                    1. Compléter les documents
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Pour toute réservation, merci de télécharger, compléter puis signer les deux
                    documents : le contrat de réservation ainsi que l’attestation d’engagement et de
                    connaissance. Les deux documents doivent ensuite être retournés par email à
                    l’élevage.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" component="h3" fontWeight={700}>
                    2. Verser l’acompte de réservation
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Un acompte de 400 € est demandé afin de rendre la réservation officielle. Tant
                    que les documents signés et l’acompte ne sont pas reçus, le chaton ne peut pas
                    être considéré comme réservé.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" component="h3" fontWeight={700}>
                    3. Régler le solde le jour du départ
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Le restant de la somme est à verser en totalité le jour du départ du chaton dans
                    sa nouvelle famille.
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box
              sx={{
                width: '100%',
                borderRadius: 5,
                p: { xs: 3, sm: 4 },
                background: 'linear-gradient(135deg, #fffaf5 0%, #f7efe7 100%)',
                border: '1px solid rgba(139, 111, 92, 0.18)',
                boxShadow: '0 18px 40px rgba(80, 55, 35, 0.08)',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Documents à télécharger
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={4}>
                Les deux documents sont nécessaires pour commencer la démarche de réservation d’un
                chaton.
              </Typography>

              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2.5}
                justifyContent="center"
                alignItems="stretch"
              >
                <Box
                  sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 4,
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(139, 111, 92, 0.14)',
                    boxShadow: '0 10px 25px rgba(80, 55, 35, 0.06)',
                  }}
                >
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: '50%',
                      backgroundColor: '#f1ded0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      color: '#7a5944',
                    }}
                  >
                    <DownloadIcon />
                  </Box>

                  <Typography variant="subtitle1" component="h3" fontWeight={700} mb={1}>
                    Contrat de réservation
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2.5}>
                    À compléter et signer pour demander officiellement la réservation du chaton.
                  </Typography>

                  <Button
                    component="a"
                    href="/documents/contrat-reservation.pdf"
                    download
                    variant="contained"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    sx={{
                      backgroundColor: '#8b6f5c',
                      color: '#fff',
                      borderRadius: 999,
                      py: 1.2,
                      textTransform: 'none',
                      fontWeight: 700,
                      boxShadow: '0 8px 18px rgba(139, 111, 92, 0.25)',
                      '&:hover': {
                        backgroundColor: '#735846',
                        boxShadow: '0 10px 22px rgba(139, 111, 92, 0.32)',
                      },
                    }}
                  >
                    Télécharger le contrat
                  </Button>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 4,
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(139, 111, 92, 0.14)',
                    boxShadow: '0 10px 25px rgba(80, 55, 35, 0.06)',
                  }}
                >
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: '50%',
                      backgroundColor: '#f1ded0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      color: '#7a5944',
                    }}
                  >
                    <DownloadIcon />
                  </Box>

                  <Typography variant="subtitle1" component="h3" fontWeight={700} mb={1}>
                    Attestation d’engagement
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2.5}>
                    À lire, compléter et signer avant l’accueil du chaton dans sa future famille.
                  </Typography>

                  <Button
                    component="a"
                    href="/documents/attestation-engagement-connaissance.pdf"
                    download
                    variant="outlined"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    sx={{
                      borderColor: '#8b6f5c',
                      color: '#7a5944',
                      borderRadius: 999,
                      py: 1.2,
                      textTransform: 'none',
                      fontWeight: 700,
                      backgroundColor: '#fffaf5',
                      '&:hover': {
                        borderColor: '#735846',
                        backgroundColor: '#f4e7dc',
                      },
                    }}
                  >
                    Télécharger l’attestation
                  </Button>
                </Box>
              </Stack>
            </Box>

            <Box
              sx={{
                width: '100%',
                borderRadius: 5,
                p: { xs: 3, sm: 4 },
                backgroundColor: '#ffffff',
                border: '1px solid rgba(139, 111, 92, 0.16)',
                boxShadow: '0 18px 40px rgba(80, 55, 35, 0.07)',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  backgroundColor: '#f1ded0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  color: '#7a5944',
                }}
              >
                <EmailIcon />
              </Box>

              <Typography variant="h5" component="h2" gutterBottom>
                Envoyer les documents complétés
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={2}>
                Une fois les documents remplis et signés, envoyez-les par email à l’élevage.
              </Typography>

              <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{
                  display: 'inline-block',
                  px: 2,
                  py: 1,
                  mb: 3,
                  borderRadius: 999,
                  backgroundColor: '#f8efe7',
                  color: '#6f5140',
                  wordBreak: 'break-word',
                }}
              >
                deslouloucoons@outlook.fr
              </Typography>

              <Box>
                <Button
                  component="a"
                  href="mailto:deslouloucoons@outlook.fr?subject=Documents%20de%20r%C3%A9servation%20compl%C3%A9t%C3%A9s&body=Bonjour,%0D%0A%0D%0AJe%20vous%20transmets%20mes%20documents%20de%20r%C3%A9servation%20compl%C3%A9t%C3%A9s%20et%20sign%C3%A9s.%0D%0A%0D%0ACordialement,"
                  variant="contained"
                  startIcon={<EmailIcon />}
                  sx={{
                    backgroundColor: '#8b6f5c',
                    color: '#fff',
                    borderRadius: 999,
                    px: 4,
                    py: 1.3,
                    textTransform: 'none',
                    fontWeight: 700,
                    boxShadow: '0 8px 18px rgba(139, 111, 92, 0.25)',
                    '&:hover': {
                      backgroundColor: '#735846',
                      boxShadow: '0 10px 22px rgba(139, 111, 92, 0.32)',
                    },
                  }}
                >
                  Envoyer les documents par email
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                width: '100%',
                borderRadius: 4,
                p: { xs: 2.5, sm: 3 },
                backgroundColor: '#f7efe7',
                borderLeft: '5px solid #8b6f5c',
                textAlign: 'left',
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                }}
              >
                La réservation devient officielle uniquement après réception des deux documents
                signés et du versement de l’acompte de <strong>400 €</strong>.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  )
}
