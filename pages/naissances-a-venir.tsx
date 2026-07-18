import Link from 'next/link'
import { Box, Button, Container, Typography } from '@mui/material'
import catsData from '@/data/db.json'
import UpcomingBirthCard, { type Cat } from '@/components/molecules/UpcomingBirthCard'
import type { UpcomingBirth } from '@/lib/upcomingBirth'

interface Database {
  cats: Cat[]
  upcomingBirth?: UpcomingBirth | null
}

export default function UpcomingBirthsPage() {
  const database = catsData as Database
  const cats = Array.isArray(database.cats) ? database.cats : []

  const upcomingBirth = database.upcomingBirth ?? null

  const mother = upcomingBirth ? cats.find(cat => cat.id === upcomingBirth.motherId) : undefined

  const father = upcomingBirth ? cats.find(cat => cat.id === upcomingBirth.fatherId) : undefined

  const hasUpcomingBirth = Boolean(upcomingBirth && mother && father)

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#5d4037',
          }}
        >
          Naissances à venir
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            maxWidth: 720,
            mx: 'auto',
            fontSize: 18,
            lineHeight: 1.8,
          }}
        >
          Découvrez les futurs mariages de nos Maine Coons et les portées attendues à l’élevage.
        </Typography>
      </Box>

      {hasUpcomingBirth ? (
        <UpcomingBirthCard
          mother={mother!}
          father={father!}
          expectedDate={upcomingBirth!.expectedDate}
          status={upcomingBirth!.status}
          note={upcomingBirth!.note}
        />
      ) : (
        <Box
          sx={{
            maxWidth: 760,
            mx: 'auto',
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: {
                xs: '1.5rem',
                md: '2rem',
              },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Aucune naissance n’est annoncée pour le moment
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 620,
              mx: 'auto',
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            Notre dernière portée est née. Les chatons seront prochainement présentés sur la page
            dédiée. Cette page sera mise à jour lorsqu’une nouvelle portée sera prévue.
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Button component={Link} href="/chatons" variant="contained" size="large">
              Découvrir nos chatons
            </Button>

            <Button component={Link} href="/contact" variant="outlined" size="large">
              Contacter l’élevage
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  )
}
