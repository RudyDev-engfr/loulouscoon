// pages/ajout-chat.tsx
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import CatForm from '@/components/molecules/CatForm'
import { Box, Typography, Container, Paper, TextField, Button } from '@mui/material'

interface AjoutChatPageProps {
  authenticated: boolean
}

const AjoutChatPage: React.FC<AjoutChatPageProps> = ({ authenticated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    const username = (document.getElementById('username') as HTMLInputElement).value
    const password = (document.getElementById('password') as HTMLInputElement).value

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      setIsAuthenticated(true)
    } else {
      alert('Identifiants incorrects !')
    }
  }

  return (
    <Container>
      <Box my={4}>
        {isAuthenticated ? (
          <CatForm />
        ) : (
          <Paper elevation={3} sx={{ padding: 4 }}>
            <form onSubmit={handleAuth}>
              <Typography variant="h6" gutterBottom>
                Authentification requise
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                id="username"
                name="username"
                label="Nom d’utilisateur"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                id="password"
                name="password"
                label="Mot de passe"
                type="password"
                variant="outlined"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Se connecter
              </Button>
            </form>
          </Paper>
        )}
      </Box>
    </Container>
  )
}

export default AjoutChatPage

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context
  const { username, password } = req.cookies || {}

  const authenticated =
    username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD

  return {
    props: {
      authenticated,
    },
  }
}
