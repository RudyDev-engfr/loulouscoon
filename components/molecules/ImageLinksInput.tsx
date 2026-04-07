// components/molecules/ImageLinksInput.tsx
import React, { useEffect, useState } from 'react'
import { Box, TextField, Typography, IconButton, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface ImageLinksInputProps {
  onChange: (links: string[]) => void
  initialLinks?: string[]
}

const ImageLinksInput: React.FC<ImageLinksInputProps> = ({ onChange, initialLinks = [''] }) => {
  const [links, setLinks] = useState<string[]>(initialLinks.length > 0 ? initialLinks : [''])

  useEffect(() => {
    const safeLinks = initialLinks.length > 0 ? initialLinks : ['']
    setLinks(safeLinks)
    onChange(safeLinks)
  }, [initialLinks, onChange])

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks)
    onChange(newLinks)
  }

  const addLinkField = () => {
    const newLinks = [...links, '']
    setLinks(newLinks)
    onChange(newLinks)
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        Liens des images
      </Typography>

      {links.map((link, index) => (
        <TextField
          key={index}
          fullWidth
          margin="normal"
          label={`Lien de l'image ${index + 1}`}
          variant="outlined"
          value={link}
          onChange={e => handleLinkChange(index, e.target.value)}
        />
      ))}

      <Box display="flex" justifyContent="center" marginTop={2}>
        <IconButton color="primary" onClick={addLinkField}>
          <AddIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default ImageLinksInput
