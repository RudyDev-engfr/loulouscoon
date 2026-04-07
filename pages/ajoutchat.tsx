import { GetServerSideProps } from 'next'
import { useState } from 'react'
import CatForm from '@/components/molecules/CatForm'
import AdminCatsList from '@/components/molecules/AdminCatsList'
import { Box, Typography, Container, Paper, TextField, Button } from '@mui/material'
import { isAdminAuthenticated } from '@/lib/adminAuth'

interface Cat {
  id: string
  name: string
  dateOfBirth: string
  sex: 'Male' | 'Female'
  type: 'kitten' | 'breeder'
  colors: string[]
  details: string
  pictures: string[]
  availability: 'Disponible' | 'Réservé' | 'Adopté'
}

interface AjoutChatPageProps {
  authenticated: boolean
}

const AjoutChatPage: React.FC<AjoutChatPageProps> = ({ authenticated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated)
  const [loading, setLoading] = useState(false)
  const [editingCat, setEditingCat] = useState<Cat | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const username = String(formData.get('username') || '')
    const password = String(formData.get('password') || '')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        window.location.reload()
      } else {
        alert('Identifiants incorrects !')
      }
    } catch (error) {
      console.error(error)
      alert('Une erreur est survenue pendant la connexion.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (response.ok) {
        setIsAuthenticated(false)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
      alert('Une erreur est survenue pendant la déconnexion.')
    }
  }

  const handleFormSuccess = () => {
    setEditingCat(null)
    setRefreshKey(prev => prev + 1)
  }

  return (
    <Container>
      <Box my={4}>
        {isAuthenticated ? (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5">Administration des chats</Typography>
              <Button variant="outlined" color="secondary" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </Box>

            <Box mb={4}>
              <Typography variant="h6" mb={2}>
                {editingCat ? `Modifier ${editingCat.name}` : 'Ajouter un chat'}
              </Typography>

              <CatForm initialData={editingCat} onSuccess={handleFormSuccess} />

              {editingCat && (
                <Box mt={2}>
                  <Button variant="text" onClick={() => setEditingCat(null)}>
                    Annuler la modification
                  </Button>
                </Box>
              )}
            </Box>

            <AdminCatsList onEdit={setEditingCat} refreshKey={refreshKey} />
          </>
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
                disabled={loading}
                sx={{ marginTop: 2 }}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
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
  const authenticated = isAdminAuthenticated(context.req)

  return {
    props: {
      authenticated,
    },
  }
}
