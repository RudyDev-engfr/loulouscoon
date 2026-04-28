import Link from 'next/link'
import { Box, Container, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        backgroundColor: '#ede7de',
        borderTop: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1.5,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Des loulou coon&apos;s
        </Typography>

        <Link
          href="/mentions-legales"
          style={{
            color: 'inherit',
            textDecoration: 'none',
            fontSize: '0.875rem',
          }}
        >
          Mentions légales
        </Link>
      </Container>
    </Box>
  )
}
