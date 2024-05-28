// pages/admin/login.tsx

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Box, TextField, Button } from '@mui/material'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Envoyez les identifiants à votre route d'API pour vérification
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      // Si les identifiants sont corrects, redirigez vers la page de gestion
      router.push('/admin/manage')
    } else {
      // Sinon, affichez une erreur
      alert('Identifiants incorrects.')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 8 }}>
      <TextField
        label="Nom d'utilisateur"
        fullWidth
        margin="normal"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Mot de passe"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
        Connexion
      </Button>
    </Box>
  )
}

export default LoginPage
