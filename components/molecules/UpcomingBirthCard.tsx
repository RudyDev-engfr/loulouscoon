import { Box, Button, Card, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export type Cat = {
  id: string
  name: string
  slug: string
  sex: 'Male' | 'Female'
  type: 'kitten' | 'breeder'
  colors: string[]
  pictures: string[]
}

type UpcomingBirthCardProps = {
  mother: Cat
  father: Cat
  expectedDate: string
  status: string
  note?: string
}

export default function UpcomingBirthCard({
  mother,
  father,
  expectedDate,
  status,
  note,
}: UpcomingBirthCardProps) {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 2.5, sm: 3, md: 5 },
        borderRadius: { xs: 5, md: 8 },
        textAlign: 'center',
        background: 'linear-gradient(135deg, #fff8f1 0%, #f5dfd2 45%, #fffaf5 100%)',
        boxShadow: '0 18px 45px rgba(80, 50, 35, 0.18)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          background:
            'radial-gradient(circle at top left, #c78f7b 0, transparent 35%), radial-gradient(circle at bottom right, #e9b7a0 0, transparent 30%)',
          pointerEvents: 'none',
        }}
      />

      <Box position="relative">
        <Chip
          label={status}
          sx={{
            mb: 2,
            px: 2,
            fontWeight: 600,
            backgroundColor: '#fff',
            color: '#9a5f50',
          }}
        />

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            color: '#5d4037',
            fontSize: { xs: 26, sm: 32, md: 38 },
          }}
        >
          {mother.name} & {father.name}
        </Typography>

        <Typography mt={1} color="text.secondary" sx={{ fontSize: { xs: 14, sm: 16 } }}>
          Naissance attendue : {expectedDate}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr auto 1fr' },
            alignItems: 'start',
            gap: { xs: 2, sm: 4, md: 5 },
            my: { xs: 3, md: 4 },
          }}
        >
          <CatPortrait cat={mother} label="Future maman" />

          <Typography
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontSize: { sm: 52, md: 68 },
              color: '#b87b6b',
              lineHeight: 1,
              alignSelf: 'center',
            }}
          >
            ♡
          </Typography>

          <CatPortrait cat={father} label="Futur papa" />
        </Box>

        {note && (
          <Typography
            sx={{
              maxWidth: 680,
              mx: 'auto',
              color: 'text.secondary',
              fontSize: { xs: 14, sm: 17 },
              lineHeight: 1.7,
            }}
          >
            {note}
          </Typography>
        )}

        <Box mt={{ xs: 3, md: 4 }}>
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            sx={{
              borderRadius: 999,
              px: { xs: 2.5, sm: 4 },
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: 13, sm: 15 },
            }}
          >
            Nous contacter pour cette future portée
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

function CatPortrait({ cat, label }: { cat: Cat; label: string }) {
  const picture = cat.pictures?.[0]

  return (
    <Box sx={{ minWidth: 0 }}>
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', sm: 210, md: 250 },
          maxWidth: { xs: 155, sm: 210, md: 250 },
          mx: 'auto',
          aspectRatio: '3 / 4',
          borderRadius: { xs: 4, sm: '48% 48% 14% 14%' },
          overflow: 'hidden',
          border: { xs: '4px solid #fff', sm: '8px solid #fff' },
          boxShadow: {
            xs: '0 8px 18px rgba(0,0,0,0.16)',
            sm: '0 12px 30px rgba(0,0,0,0.2)',
          },
          backgroundColor: '#eee',
        }}
      >
        {picture && (
          <Image
            src={picture}
            alt={cat.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 600px) 155px, (max-width: 900px) 210px, 250px"
          />
        )}
      </Box>

      <Typography
        variant="overline"
        display="block"
        mt={1.5}
        color="text.secondary"
        sx={{ fontSize: { xs: 10, sm: 12 } }}
      >
        {label}
      </Typography>

      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          fontSize: { xs: 17, sm: 20 },
          color: '#5d4037',
        }}
      >
        {cat.name}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: { xs: 12, sm: 14 },
          minHeight: { xs: 36, sm: 'auto' },
        }}
      >
        {cat.colors.join(', ')}
      </Typography>

      <Button
        component={Link}
        href={`/reproducteurs/${cat.slug}`}
        size="small"
        sx={{
          mt: 1,
          textTransform: 'none',
          color: '#9a5f50',
          fontSize: { xs: 12, sm: 13 },
        }}
      >
        Voir sa fiche
      </Button>
    </Box>
  )
}
