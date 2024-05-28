// components/molecules/CatForm.tsx
import React, { useState } from 'react'
import { TextField, Button, Box, Typography, Container, Paper, MenuItem } from '@mui/material'
import ImageLinksInput from './ImageLinksInput'

interface CatFormData {
  name: string
  dateOfBirth: string
  sex: 'Male' | 'Female'
  type: 'kitten' | 'breeder'
  colors: string
  details: string
  pictures: string[]
}

const CatForm: React.FC = () => {
  const [formData, setFormData] = useState<CatFormData>({
    name: '',
    dateOfBirth: '',
    sex: 'Male',
    type: 'kitten',
    colors: '',
    details: '',
    pictures: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePicturesChange = (pictures: string[]) => {
    setFormData({
      ...formData,
      pictures,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Filtrer les liens vides
    const filteredPictures = formData.pictures.filter(link => link.trim() !== '')

    const response = await fetch('/api/addCat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, pictures: filteredPictures }),
    })

    if (response.ok) {
      // Réinitialiser le formulaire après succès
      setFormData({
        name: '',
        dateOfBirth: '',
        sex: 'Male',
        type: 'kitten',
        colors: '',
        details: '',
        pictures: [],
      })
      alert('Chat ajouté avec succès')
    } else {
      alert('Erreur lors de l’ajout du chat')
    }
  }

  return (
    <Container>
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h6" gutterBottom>
            Ajouter un nouveau chat
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
              InputLabelProps={{
                shrink: true,
              }}
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
              SelectProps={{
                native: true,
              }}
              variant="outlined"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
              id="colors"
              name="colors"
              label="Couleurs"
              variant="outlined"
              value={formData.colors}
              onChange={handleChange}
              required
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
            <ImageLinksInput onChange={handlePicturesChange} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Ajouter le chat
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}

export default CatForm
