import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { UpcomingBirth } from '@/lib/upcomingBirth'

export interface AdminCat {
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

interface UpcomingBirthAdminProps {
  selectedMother: AdminCat | null
  selectedFather: AdminCat | null
  expectedDate: string
  status: string
  note: string
  loading: boolean
  saving: boolean
  message: string | null
  error: string | null
  hasPublishedBirth: boolean
  onExpectedDateChange: (value: string) => void
  onStatusChange: (value: string) => void
  onNoteChange: (value: string) => void
  onSave: () => void
  onDelete: () => void
  onClearSelection: () => void
}

const UpcomingBirthAdmin: React.FC<UpcomingBirthAdminProps> = ({
  selectedMother,
  selectedFather,
  expectedDate,
  status,
  note,
  loading,
  saving,
  message,
  error,
  hasPublishedBirth,
  onExpectedDateChange,
  onStatusChange,
  onNoteChange,
  onSave,
  onDelete,
  onClearSelection,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress size={28} />
      </Box>
    )
  }

  const canSave = Boolean(selectedMother && selectedFather)

  return (
    <Box>
      <Typography variant="h5" component="h2" fontWeight={700} mb={1}>
        Naissance à venir
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Sélectionnez une reproductrice et un reproducteur dans la liste des chats, puis publiez
        l’annonce.
      </Typography>

      {message && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3}>
        <Box
          sx={{
            flex: 1,
            p: 2,
            border: 1,
            borderColor: selectedMother ? 'primary.main' : 'divider',
            borderRadius: 2,
          }}
        >
          <Typography variant="overline" color="text.secondary">
            Mère
          </Typography>

          <Typography variant="h6" fontWeight={700}>
            {selectedMother?.name || 'Non sélectionnée'}
          </Typography>

          {selectedMother && (
            <Chip label="Reproductrice sélectionnée" color="primary" size="small" sx={{ mt: 1 }} />
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 2,
            border: 1,
            borderColor: selectedFather ? 'primary.main' : 'divider',
            borderRadius: 2,
          }}
        >
          <Typography variant="overline" color="text.secondary">
            Père
          </Typography>

          <Typography variant="h6" fontWeight={700}>
            {selectedFather?.name || 'Non sélectionné'}
          </Typography>

          {selectedFather && (
            <Chip label="Reproducteur sélectionné" color="primary" size="small" sx={{ mt: 1 }} />
          )}
        </Box>
      </Stack>

      <Stack spacing={3}>
        <TextField
          label="Date ou période prévue"
          value={expectedDate}
          onChange={event => onExpectedDateChange(event.target.value)}
          placeholder="Exemple : Septembre 2026"
          fullWidth
        />

        <TextField
          select
          label="Statut de l’annonce"
          value={status}
          onChange={event => onStatusChange(event.target.value)}
          fullWidth
        >
          <MenuItem value="">Aucun statut particulier</MenuItem>

          <MenuItem value="Mariage prévu">Mariage prévu</MenuItem>

          <MenuItem value="Mariage réalisé">Mariage réalisé</MenuItem>

          <MenuItem value="Gestation confirmée">Gestation confirmée</MenuItem>

          <MenuItem value="Naissance attendue">Naissance attendue</MenuItem>
        </TextField>

        <TextField
          label="Note facultative"
          value={note}
          onChange={event => onNoteChange(event.target.value)}
          placeholder="Informations complémentaires concernant la future portée."
          multiline
          minRows={3}
          fullWidth
        />
      </Stack>

      <Box mt={3} display="flex" gap={2} flexWrap="wrap">
        <Button variant="contained" disabled={!canSave || saving} onClick={onSave}>
          {saving
            ? 'Enregistrement...'
            : hasPublishedBirth
            ? 'Mettre à jour l’annonce'
            : 'Publier la naissance à venir'}
        </Button>

        {(selectedMother || selectedFather) && (
          <Button variant="outlined" disabled={saving} onClick={onClearSelection}>
            Effacer la sélection
          </Button>
        )}

        {hasPublishedBirth && (
          <Button variant="contained" color="error" disabled={saving} onClick={onDelete}>
            Vider la naissance à venir
          </Button>
        )}
      </Box>

      {hasPublishedBirth && (
        <>
          <Divider sx={{ my: 4 }} />

          <Typography variant="body2" color="text.secondary">
            Cette annonce est actuellement visible sur la page publique « Naissances à venir ».
          </Typography>
        </>
      )}
    </Box>
  )
}

export default UpcomingBirthAdmin
