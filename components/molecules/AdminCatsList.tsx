import { useEffect, useState } from 'react'
import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'

export interface Cat {
  id: string
  name: string
  dateOfBirth: string
  sex: 'Male' | 'Female'
  type: 'kitten' | 'breeder'
  colors: string[]
  details: string
  pictures: string[]
  availability: 'Disponible' | 'Réservé' | 'Adopté'
  price?: number | null
}

interface AdminCatsListProps {
  onEdit: (cat: Cat) => void
  refreshKey?: number

  selectedMotherId?: string | null
  selectedFatherId?: string | null

  onSelectMother?: (cat: Cat) => void
  onSelectFather?: (cat: Cat) => void
}

const AdminCatsList: React.FC<AdminCatsListProps> = ({
  onEdit,
  refreshKey = 0,
  selectedMotherId = null,
  selectedFatherId = null,
  onSelectMother,
  onSelectFather,
}) => {
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

      setCats(previousCats => previousCats.filter(cat => cat.id !== id))
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la suppression.')
    }
  }

  const getTypeLabel = (cat: Cat) => {
    if (cat.type === 'breeder') {
      return cat.sex === 'Female' ? 'Reproductrice' : 'Reproducteur'
    }

    return 'Chaton'
  }

  const getSexLabel = (sex: Cat['sex']) => {
    return sex === 'Male' ? 'Mâle' : 'Femelle'
  }

  if (loading) {
    return <Typography>Chargement des chats...</Typography>
  }

  return (
    <>
      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" component="h2" fontWeight={700} gutterBottom>
        Chats existants
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Pour annoncer une future portée, choisissez une femelle comme mère et un mâle comme père
        parmi les reproducteurs.
      </Typography>

      <Stack spacing={2}>
        {cats.length === 0 ? (
          <Typography>Aucun chat enregistré.</Typography>
        ) : (
          cats.map(cat => {
            const isBreeder = cat.type === 'breeder'
            const isFemale = cat.sex === 'Female'
            const isMale = cat.sex === 'Male'

            const isSelectedMother = selectedMotherId === cat.id

            const isSelectedFather = selectedFatherId === cat.id

            const isSelected = isSelectedMother || isSelectedFather

            return (
              <Paper
                key={cat.id}
                elevation={isSelected ? 4 : 2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: isSelected ? 2 : 1,
                  borderColor: isSelected ? 'primary.main' : 'divider',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap={2}
                  flexWrap="wrap"
                >
                  <Box>
                    <Typography variant="h6" component="h3" fontWeight={700}>
                      {cat.name}
                    </Typography>

                    <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                      <Chip label={getTypeLabel(cat)} size="small" variant="outlined" />

                      <Chip label={getSexLabel(cat.sex)} size="small" variant="outlined" />

                      {isSelectedMother && (
                        <Chip label="Mère sélectionnée" size="small" color="primary" />
                      )}

                      {isSelectedFather && (
                        <Chip label="Père sélectionné" size="small" color="primary" />
                      )}
                    </Box>
                  </Box>

                  {cat.pictures?.[0] && (
                    <Box
                      component="img"
                      src={cat.pictures[0]}
                      alt={cat.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </Box>

                <Box mt={2}>
                  <Typography variant="body2">
                    Disponibilité : {cat.availability || 'Non renseignée'}
                  </Typography>

                  <Typography variant="body2">
                    Couleurs : {cat.colors?.join(', ') || 'Non renseignées'}
                  </Typography>

                  {cat.dateOfBirth && (
                    <Typography variant="body2">Date de naissance : {cat.dateOfBirth}</Typography>
                  )}
                </Box>

                <Box mt={2} display="flex" gap={1.5} flexWrap="wrap">
                  {isBreeder && isFemale && onSelectMother && (
                    <Button
                      variant={isSelectedMother ? 'contained' : 'outlined'}
                      color={isSelectedMother ? 'success' : 'primary'}
                      onClick={() => onSelectMother(cat)}
                    >
                      {isSelectedMother ? 'Mère sélectionnée' : 'Choisir comme mère'}
                    </Button>
                  )}

                  {isBreeder && isMale && onSelectFather && (
                    <Button
                      variant={isSelectedFather ? 'contained' : 'outlined'}
                      color={isSelectedFather ? 'success' : 'primary'}
                      onClick={() => onSelectFather(cat)}
                    >
                      {isSelectedFather ? 'Père sélectionné' : 'Choisir comme père'}
                    </Button>
                  )}

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
            )
          })
        )}
      </Stack>
    </>
  )
}

export default AdminCatsList
