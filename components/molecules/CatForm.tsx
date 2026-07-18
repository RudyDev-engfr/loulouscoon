// components/molecules/CatForm.tsx
import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import ImageLinksInput from './ImageLinksInput'

interface CatFormData {
  name: string
  dateOfBirth: string
  sex: 'Male' | 'Female'
  type: 'kitten' | 'breeder'
  colors: string
  details: string
  pictures: string[]
  availability: 'Disponible' | 'Réservé' | 'Adopté'
  price: string
}

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
  price?: number | null
}

type CatPayload = Omit<CatFormData, 'colors' | 'price'> & {
  colors: string[]
  price: number | null
}

interface CatFormProps {
  initialData?: Cat | null
  onSuccess?: () => void
}

const initialFormData: CatFormData = {
  name: '',
  dateOfBirth: '',
  sex: 'Male',
  type: 'kitten',
  colors: '',
  details: '',
  pictures: [],
  availability: 'Disponible',
  price: '',
}

const normalizeColors = (value: string): string[] => {
  return value
    .split(/[,;/\n]+/)
    .map(color => color.trim())
    .filter(Boolean)
}

const CatForm: React.FC<CatFormProps> = ({ initialData = null, onSuccess }) => {
  const [formData, setFormData] = useState<CatFormData>(initialFormData)
  const [loading, setLoading] = useState(false)

  const isEditMode = Boolean(initialData?.id)

  const shouldDisplayPrice = formData.type === 'kitten' && formData.availability !== 'Adopté'

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        dateOfBirth: initialData.dateOfBirth || '',
        sex: initialData.sex || 'Male',
        type: initialData.type || 'kitten',
        colors: initialData.colors?.join(', ') || '',
        details: initialData.details || '',
        pictures: initialData.pictures || [],
        availability: initialData.availability || 'Disponible',
        price:
          initialData.price !== null && initialData.price !== undefined
            ? String(initialData.price)
            : '',
      })
    } else {
      setFormData(initialFormData)
    }
  }, [initialData])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormData(previousFormData => ({
      ...previousFormData,
      [name]: value,
    }))
  }

  const handlePicturesChange = (pictures: string[]) => {
    setFormData(previousFormData => ({
      ...previousFormData,
      pictures,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const trimmedPrice = formData.price.trim()
    const parsedPrice = trimmedPrice === '' ? null : Number(trimmedPrice)

    if (
      shouldDisplayPrice &&
      parsedPrice !== null &&
      (!Number.isFinite(parsedPrice) || parsedPrice < 0)
    ) {
      alert('Le prix doit être un nombre positif.')
      return
    }

    setLoading(true)

    try {
      const filteredPictures = formData.pictures.filter(link => link.trim() !== '')

      const payload: CatPayload & { id?: string } = {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        sex: formData.sex,
        type: formData.type,
        colors: normalizeColors(formData.colors),
        details: formData.details,
        pictures: filteredPictures,
        availability: formData.availability,
        price: shouldDisplayPrice ? parsedPrice : null,
      }

      if (isEditMode && initialData?.id) {
        payload.id = initialData.id
      }

      const response = await fetch(isEditMode ? '/api/updateCat' : '/api/addCat', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(errorData?.message || 'Erreur lors de l’enregistrement du chat')
      }

      if (isEditMode) {
        alert('Chat modifié avec succès')
      } else {
        setFormData(initialFormData)
        alert('Chat ajouté avec succès')
      }

      onSuccess?.()
    } catch (error) {
      console.error(error)

      alert(
        error instanceof Error
          ? error.message
          : isEditMode
          ? 'Erreur lors de la modification du chat'
          : 'Erreur lors de l’ajout du chat'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h6" gutterBottom>
          {isEditMode ? 'Modifier le chat' : 'Ajouter un nouveau chat'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="name"
            name="name"
            label="Nom du chat"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date de naissance"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            id="sex"
            name="sex"
            label="Sexe"
            select
            SelectProps={{ native: true }}
            variant="outlined"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="Male">Mâle</option>
            <option value="Female">Femelle</option>
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            id="type"
            name="type"
            label="Type"
            select
            variant="outlined"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="kitten">Chaton</MenuItem>
            <MenuItem value="breeder">Reproducteur</MenuItem>
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            id="availability"
            name="availability"
            label="Disponibilité"
            select
            variant="outlined"
            value={formData.availability}
            onChange={handleChange}
            required
          >
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="Réservé">Réservé</MenuItem>
            <MenuItem value="Adopté">Adopté</MenuItem>
          </TextField>

          {shouldDisplayPrice && (
            <TextField
              fullWidth
              margin="normal"
              id="price"
              name="price"
              label="Prix"
              type="text"
              variant="outlined"
              value={formData.price}
              onChange={event => {
                const value = event.target.value

                if (/^\d*$/.test(value)) {
                  setFormData(previousFormData => ({
                    ...previousFormData,
                    price: value,
                  }))
                }
              }}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              helperText="Champ facultatif"
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
            />
          )}

          <TextField
            fullWidth
            margin="normal"
            id="colors"
            name="colors"
            label="Couleurs"
            variant="outlined"
            value={formData.colors}
            onChange={handleChange}
            required
            helperText="Sépare les couleurs par des virgules (ex : Black silver mackerel tabby, Blue silver)"
          />

          <TextField
            fullWidth
            margin="normal"
            id="details"
            name="details"
            label="Détails"
            variant="outlined"
            multiline
            rows={4}
            value={formData.details}
            onChange={handleChange}
            required
          />

          <ImageLinksInput onChange={handlePicturesChange} initialLinks={formData.pictures} />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading
              ? isEditMode
                ? 'Modification...'
                : 'Ajout...'
              : isEditMode
              ? 'Modifier le chat'
              : 'Ajouter le chat'}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default CatForm
