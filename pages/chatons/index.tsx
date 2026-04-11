import { GetServerSideProps } from 'next'
import { Box, Container, Grid, Typography } from '@mui/material'
import CatCard from '@/components/molecules/CatCard'
import type { LitterWithKittens } from '@/lib/cat'
import { getCatSlug } from '@/lib/cat'
import { getLitterGroups } from '@/lib/cat.server'

interface ChatonsPageProps {
  litters: LitterWithKittens[]
}

export default function ChatonsPage({ litters }: ChatonsPageProps) {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Nos chatons
      </Typography>

      {litters.map(litter => (
        <Box key={litter.id} sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            {litter.title}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Nés le {litter.birthDate}
          </Typography>

          <Grid container spacing={3}>
            {litter.kittens.map(kitten => (
              <Grid item xs={12} sm={6} md={4} key={kitten.id}>
                <CatCard
                  catName={kitten.name}
                  catImage={kitten.pictures?.[0] ?? '/images/placeholder-cat.jpg'}
                  catSex={kitten.sex}
                  catLink={`/chats/${getCatSlug(kitten)}`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<ChatonsPageProps> = async () => {
  const litters = await getLitterGroups()

  return {
    props: {
      litters,
    },
  }
}
