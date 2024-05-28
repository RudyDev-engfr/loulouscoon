// components/molecules/ImageLinksInput.tsx
import React, { useState } from 'react'
import { Box, TextField, Typography, IconButton, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface ImageLinksInputProps {
  onChange: (links: string[]) => void
}

const ImageLinksInput: React.FC<ImageLinksInputProps> = ({ onChange }) => {
  const [links, setLinks] = useState<string[]>([''])

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks)
    onChange(newLinks)
  }

  const addLinkField = () => {
    setLinks([...links, ''])
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
