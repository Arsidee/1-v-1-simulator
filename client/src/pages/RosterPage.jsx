import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import CharacterCard from '../components/CharacterCard'

export default function RosterPage() {
  const [characters, setCharacters] = useState([])
  const navigate = useNavigate()

  useEffect(function () {
    fetch('/api/characters')
      .then(function (res) { return res.json() })
      .then(function (data) { setCharacters(data) })
  }, [])

  function handleDelete(id) {
    fetch(`/api/characters/${id}`, { method: 'DELETE' })
      .then(function () {
        setCharacters(characters.filter(function (c) { return c.id !== id }))
      })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Character Roster
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={function () { navigate('/create') }}
          >
            New Character
          </Button>
          <Button
            variant="contained"
            startIcon={<SportsKabaddiIcon />}
            onClick={function () { navigate('/simulate') }}
            disabled={characters.length < 2}
          >
            Simulate Battle
          </Button>
        </Box>
      </Box>

      {characters.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No characters yet. Create one to get started.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {characters.map(function (character) {
            return (
              <Grid key={character.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <CharacterCard character={character} onDelete={handleDelete} />
              </Grid>
            )
          })}
        </Grid>
      )}
    </Container>
  )
}
