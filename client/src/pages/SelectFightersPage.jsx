import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import ShieldIcon from '@mui/icons-material/Shield'
import BoltIcon from '@mui/icons-material/Bolt'

export default function SelectFightersPage() {
  const [characters, setCharacters] = useState([])
  const [fighter1, setFighter1] = useState(null)
  const [fighter2, setFighter2] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(function () {
    fetch('/api/characters')
      .then(function (res) { return res.json() })
      .then(function (data) { setCharacters(data) })
  }, [])

  function handleSelect(character) {
    if (fighter1 && fighter1.id === character.id) {
      setFighter1(null)
      return
    }
    if (fighter2 && fighter2.id === character.id) {
      setFighter2(null)
      return
    }
    if (!fighter1) {
      setFighter1(character)
    } else if (!fighter2) {
      setFighter2(character)
    }
  }

  function getSelectionLabel(character) {
    if (fighter1 && fighter1.id === character.id) return '1'
    if (fighter2 && fighter2.id === character.id) return '2'
    return null
  }

  function handleStartBattle() {
    setLoading(true)
    fetch(`/api/characters/${fighter1.id}/vs/${fighter2.id}/simulate`, { method: 'POST' })
      .then(function (res) { return res.json() })
      .then(function (result) {
        navigate('/battle', { state: { ...result, fighter1, fighter2 } })
      })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={function () { navigate('/') }}
        sx={{ mb: 3 }}
      >
        Back to Roster
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Select Two Fighters
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Click a character to select them as Fighter 1, click another for Fighter 2.
      </Typography>

      <Grid container spacing={3}>
        {characters.map(function (character) {
          var label = getSelectionLabel(character)
          var isSelected = label !== null
          var isFull = fighter1 && fighter2 && !isSelected

          return (
            <Grid key={character.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                onClick={function () { if (!isFull) handleSelect(character) }}
                sx={{
                  cursor: isFull ? 'default' : 'pointer',
                  opacity: isFull ? 0.4 : 1,
                  outline: isSelected ? '2px solid' : 'none',
                  outlineColor: label === '1' ? 'primary.main' : 'secondary.main',
                  transition: 'all 0.15s ease',
                  '&:hover': { transform: isFull ? 'none' : 'translateY(-2px)' },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6">{character.character_name}</Typography>
                    {isSelected && (
                      <Chip
                        label={`Fighter ${label}`}
                        color={label === '1' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip icon={<FavoriteIcon />} label={`HP ${character.hp}`} color="error" size="small" />
                    <Chip icon={<SportsKabaddiIcon />} label={`ATK ${character.attack}`} color="warning" size="small" />
                    <Chip icon={<ShieldIcon />} label={`DEF ${character.defense}`} color="info" size="small" />
                    <Chip icon={<BoltIcon />} label={`SPD ${character.speed}`} color="success" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SportsKabaddiIcon />}
          disabled={!fighter1 || !fighter2 || loading}
          onClick={handleStartBattle}
        >
          {loading ? 'Simulating...' : 'Start Battle'}
        </Button>
      </Box>
    </Container>
  )
}
