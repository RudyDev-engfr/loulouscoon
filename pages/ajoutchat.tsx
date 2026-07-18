import type { GetServerSideProps } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import CatForm from '@/components/molecules/CatForm'
import AdminCatsList, { type Cat } from '@/components/molecules/AdminCatsList'
import UpcomingBirthAdmin from '@/components/molecules/UpcomingBirthAdmin'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import type { UpcomingBirth } from '@/lib/upcomingBirth'

interface AjoutChatPageProps {
  authenticated: boolean
}

const AjoutChatPage: React.FC<AjoutChatPageProps> = ({ authenticated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated)

  const [loading, setLoading] = useState(false)
  const [editingCat, setEditingCat] = useState<Cat | null>(null)

  const [refreshKey, setRefreshKey] = useState(0)

  const [cats, setCats] = useState<Cat[]>([])
  const [selectedMother, setSelectedMother] = useState<Cat | null>(null)

  const [selectedFather, setSelectedFather] = useState<Cat | null>(null)

  const [expectedDate, setExpectedDate] = useState('')
  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')

  const [birthLoading, setBirthLoading] = useState(true)

  const [birthSaving, setBirthSaving] = useState(false)

  const [hasPublishedBirth, setHasPublishedBirth] = useState(false)

  const [birthMessage, setBirthMessage] = useState<string | null>(null)

  const [birthError, setBirthError] = useState<string | null>(null)

  const fetchCats = useCallback(async () => {
    const response = await fetch('/api/getCats')

    if (!response.ok) {
      throw new Error('Impossible de charger les chats.')
    }

    const data = await response.json()

    const safeCats = Array.isArray(data?.cats) ? data.cats : Array.isArray(data) ? data : []

    setCats(safeCats)

    return safeCats as Cat[]
  }, [])

  const loadUpcomingBirth = useCallback(async () => {
    try {
      setBirthLoading(true)
      setBirthError(null)

      const [loadedCats, birthResponse] = await Promise.all([
        fetchCats(),
        fetch('/api/upcomingBirth'),
      ])

      if (!birthResponse.ok) {
        throw new Error('Impossible de charger la naissance à venir.')
      }

      const birthData = await birthResponse.json()

      const upcomingBirth = birthData?.upcomingBirth as UpcomingBirth | null

      if (!upcomingBirth) {
        setSelectedMother(null)
        setSelectedFather(null)
        setExpectedDate('')
        setStatus('')
        setNote('')
        setHasPublishedBirth(false)

        return
      }

      const mother = loadedCats.find(cat => cat.id === upcomingBirth.motherId) || null

      const father = loadedCats.find(cat => cat.id === upcomingBirth.fatherId) || null

      setSelectedMother(mother)
      setSelectedFather(father)
      setExpectedDate(upcomingBirth.expectedDate || '')
      setStatus(upcomingBirth.status || '')
      setNote(upcomingBirth.note || '')
      setHasPublishedBirth(true)
    } catch (error) {
      console.error(error)

      setBirthError(error instanceof Error ? error.message : 'Une erreur est survenue.')
    } finally {
      setBirthLoading(false)
    }
  }, [fetchCats])

  useEffect(() => {
    if (isAuthenticated) {
      loadUpcomingBirth()
    }
  }, [isAuthenticated, loadUpcomingBirth, refreshKey])

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const username = String(formData.get('username') || '')
    const password = String(formData.get('password') || '')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
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
    setRefreshKey(previousKey => previousKey + 1)
  }

  const handleSelectMother = (cat: Cat) => {
    setSelectedMother(cat)
    setBirthMessage(null)
    setBirthError(null)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleSelectFather = (cat: Cat) => {
    setSelectedFather(cat)
    setBirthMessage(null)
    setBirthError(null)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleSaveUpcomingBirth = async () => {
    if (!selectedMother || !selectedFather) {
      setBirthError('Sélectionnez une mère et un père.')

      return
    }

    try {
      setBirthSaving(true)
      setBirthMessage(null)
      setBirthError(null)

      const response = await fetch('/api/upcomingBirth', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          motherId: selectedMother.id,
          fatherId: selectedFather.id,
          expectedDate,
          status,
          note,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Impossible d’enregistrer l’annonce.')
      }

      setHasPublishedBirth(true)

      setBirthMessage(
        hasPublishedBirth
          ? 'La naissance à venir a été mise à jour.'
          : 'La naissance à venir a été publiée.'
      )
    } catch (error) {
      console.error(error)

      setBirthError(error instanceof Error ? error.message : 'Une erreur est survenue.')
    } finally {
      setBirthSaving(false)
    }
  }

  const handleDeleteUpcomingBirth = async () => {
    const confirmed = window.confirm('Retirer complètement la naissance à venir du site ?')

    if (!confirmed) return

    try {
      setBirthSaving(true)
      setBirthMessage(null)
      setBirthError(null)

      const response = await fetch('/api/upcomingBirth', {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Impossible de retirer l’annonce.')
      }

      setSelectedMother(null)
      setSelectedFather(null)
      setExpectedDate('')
      setStatus('')
      setNote('')
      setHasPublishedBirth(false)

      setBirthMessage('La naissance à venir a été retirée du site.')
    } catch (error) {
      console.error(error)

      setBirthError(error instanceof Error ? error.message : 'Une erreur est survenue.')
    } finally {
      setBirthSaving(false)
    }
  }

  const handleClearSelection = () => {
    setSelectedMother(null)
    setSelectedFather(null)
    setExpectedDate('')
    setStatus('')
    setNote('')
    setBirthMessage(null)
    setBirthError(null)
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        {isAuthenticated ? (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} mb={4}>
              <Typography variant="h5" component="h1" fontWeight={700}>
                Administration des chats
              </Typography>

              <Button variant="outlined" color="secondary" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </Box>

            <Paper
              elevation={1}
              sx={{
                p: { xs: 2, md: 4 },
                mb: 4,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" component="h2" fontWeight={700} mb={2}>
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
            </Paper>

            <Paper
              elevation={1}
              sx={{
                p: { xs: 2, md: 4 },
                mb: 4,
                borderRadius: 3,
              }}
            >
              <UpcomingBirthAdmin
                selectedMother={selectedMother}
                selectedFather={selectedFather}
                expectedDate={expectedDate}
                status={status}
                note={note}
                loading={birthLoading}
                saving={birthSaving}
                message={birthMessage}
                error={birthError}
                hasPublishedBirth={hasPublishedBirth}
                onExpectedDateChange={setExpectedDate}
                onStatusChange={setStatus}
                onNoteChange={setNote}
                onSave={handleSaveUpcomingBirth}
                onDelete={handleDeleteUpcomingBirth}
                onClearSelection={handleClearSelection}
              />
            </Paper>

            <Divider sx={{ my: 4 }} />

            <AdminCatsList
              onEdit={setEditingCat}
              refreshKey={refreshKey}
              selectedMotherId={selectedMother?.id || null}
              selectedFatherId={selectedFather?.id || null}
              onSelectMother={handleSelectMother}
              onSelectFather={handleSelectFather}
            />
          </>
        ) : (
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 4 },
              maxWidth: 520,
              mx: 'auto',
              borderRadius: 3,
            }}
          >
            <form onSubmit={handleAuth}>
              <Typography variant="h6" component="h1" fontWeight={700} gutterBottom>
                Authentification requise
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                id="username"
                name="username"
                label="Nom d’utilisateur"
                required
              />

              <TextField
                fullWidth
                margin="normal"
                id="password"
                name="password"
                label="Mot de passe"
                type="password"
                required
              />

              <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
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

export const getServerSideProps: GetServerSideProps<AjoutChatPageProps> = async context => {
  const authenticated = isAdminAuthenticated(context.req)

  return {
    props: {
      authenticated,
    },
  }
}
