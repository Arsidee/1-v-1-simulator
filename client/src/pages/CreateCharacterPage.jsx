import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function CreateCharacterPage() {
  const [form, setForm] = useState({
    characterName: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
  })

  const navigate = useNavigate()

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    fetch('/api/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        characterName: form.characterName,
        hp: Number(form.hp),
        attack: Number(form.attack),
        defense: Number(form.defense),
        speed: Number(form.speed),
      }),
    }).then(function () {
      navigate('/')
    })
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={function () { navigate('/') }}
        sx={{ mb: 3 }}
      >
        Back to Roster
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Create Character
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
        <TextField
          label="Character Name"
          name="characterName"
          value={form.characterName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="HP"
          name="hp"
          type="number"
          value={form.hp}
          onChange={handleChange}
          helperText="Suggested: 50–200"
          required
          fullWidth
        />
        <TextField
          label="Attack"
          name="attack"
          type="number"
          value={form.attack}
          onChange={handleChange}
          helperText="Suggested: 10–50"
          required
          fullWidth
        />
        <TextField
          label="Defense"
          name="defense"
          type="number"
          value={form.defense}
          onChange={handleChange}
          helperText="Suggested: 5–40"
          required
          fullWidth
        />
        <TextField
          label="Speed"
          name="speed"
          type="number"
          value={form.speed}
          onChange={handleChange}
          helperText="Determines who attacks first each round"
          required
          fullWidth
        />
        <Button type="submit" variant="contained" size="large">
          Create Character
        </Button>
      </Box>
    </Container>
  )
}
