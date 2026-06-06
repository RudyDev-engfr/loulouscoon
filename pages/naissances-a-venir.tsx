import { Box, Container, Typography } from '@mui/material'
import catsData from '@/data/db.json'
import { upcomingBirths } from '@/data/upcomingBirths'
import UpcomingBirthCard, { Cat } from '@/components/molecules/UpcomingBirthCard'

export default function UpcomingBirthsPage() {
  const cats = catsData.cats as Cat[]

  const births = upcomingBirths
    .map(birth => {
      const mother = cats.find(cat => cat.slug === birth.motherSlug)
      const father = cats.find(cat => cat.slug === birth.fatherSlug)

      return {
        ...birth,
        mother,
        father,
      }
    })
    .filter(birth => birth.mother && birth.father)

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
          }}
        >
          Découvrez les futurs mariages de nos Maine Coons et les portées attendues à l’élevage.
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={5}>
        {births.map(birth => (
          <UpcomingBirthCard
            key={`${birth.motherSlug}-${birth.fatherSlug}`}
            mother={birth.mother!}
            father={birth.father!}
            expectedDate={birth.expectedDate}
            status={birth.status}
            note={birth.note}
          />
        ))}
      </Box>

      {births.length === 0 && (
        <Box textAlign="center" mt={8}>
          <Typography variant="h6" color="text.secondary">
            Aucune naissance n’est annoncée pour le moment.
          </Typography>
        </Box>
      )}
    </Container>
  )
}
