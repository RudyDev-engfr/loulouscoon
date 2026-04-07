import { useEffect, useState } from 'react'
import { Box, Button, Paper, Typography, Stack, Divider } from '@mui/material'

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

interface AdminCatsListProps {
  onEdit: (cat: Cat) => void
  refreshKey?: number
}

const AdminCatsList: React.FC<AdminCatsListProps> = ({ onEdit, refreshKey = 0 }) => {
  const [cats, setCats] = useState<Cat[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCats = async () => {
    try {
      setLoading(true)

      const response = await fetch('/api/getCats')

      if (!response.ok) {
        throw new Error('Impossible de charger les chats')
      }

      const data = await response.json()
      const safeCats = Array.isArray(data?.cats) ? data.cats : Array.isArray(data) ? data : []

      setCats(safeCats)
    } catch (error) {
      console.error(error)
      setCats([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCats()
  }, [refreshKey])

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`Supprimer ${name} ?`)
    if (!confirmed) return

    try {
      const response = await fetch(`/api/deleteCat?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('deleteCat error:', data)
        throw new Error(data?.message || 'Erreur lors de la suppression')
      }

      setCats(prev => prev.filter(cat => cat.id !== id))
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la suppression.')
    }
  }

  if (loading) {
    return <Typography>Chargement des chats...</Typography>
  }

  return (
    <>
      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Chats existants
      </Typography>

      <Stack spacing={2}>
        {!Array.isArray(cats) || cats.length === 0 ? (
          <Typography>Aucun chat enregistré.</Typography>
        ) : (
          cats.map(cat => (
            <Paper key={cat.id} elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">{cat.name}</Typography>
              <Typography variant="body2">Type : {cat.type}</Typography>
              <Typography variant="body2">Sexe : {cat.sex}</Typography>
              <Typography variant="body2">
                Disponibilité : {cat.availability || 'Non renseignée'}
              </Typography>
              <Typography variant="body2">
                Couleurs : {cat.colors?.join(', ') || 'Non renseignées'}
              </Typography>

              <Box mt={2} display="flex" gap={2}>
                <Button variant="outlined" onClick={() => onEdit(cat)}>
                  Modifier
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(cat.id, cat.name)}
                >
                  Supprimer
                </Button>
              </Box>
            </Paper>
          ))
        )}
      </Stack>
    </>
  )
}

export default AdminCatsList
