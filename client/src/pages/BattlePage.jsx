import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ReplayIcon from '@mui/icons-material/Replay'

export default function BattlePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!location.state) {
    navigate('/')
    return null
  }

  var { winner, turns, fighter1, fighter2 } = location.state
  var visibleTurns = turns.slice(0, currentIndex)
  var battleOver = currentIndex >= turns.length

  function handleNext() {
    if (currentIndex < turns.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  function handleSkip() {
    setCurrentIndex(turns.length)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        <SportsKabaddiIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        {fighter1.character_name} vs {fighter2.character_name}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
        {visibleTurns.map(function (turn, index) {
          return (
            <Paper key={index} sx={{ px: 2.5, py: 1.5 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Round {turn.turn}
              </Typography>
              <Typography>
                <strong>{turn.attacker}</strong> hits <strong>{turn.defender}</strong> for{' '}
                <Typography component="span" color="error.main" fontWeight="bold">
                  {turn.damage} damage
                </Typography>
                {' '}— {turn.defender} HP: <strong>{turn.defenderHp}</strong>
              </Typography>
            </Paper>
          )
        })}
      </Box>

      {battleOver ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <EmojiEventsIcon sx={{ fontSize: 64, color: 'secondary.main', mb: 1 }} />
          <Typography variant="h4" color="secondary.main" gutterBottom>
            {winner} wins!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={function () { navigate('/') }}
            >
              Back to Roster
            </Button>
            <Button
              variant="contained"
              startIcon={<ReplayIcon />}
              onClick={function () { navigate('/simulate') }}
            >
              Fight Again
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNext}
          >
            Next Attack
          </Button>
          <Button variant="outlined" onClick={handleSkip}>
            Skip to End
          </Button>
        </Box>
      )}
    </Container>
  )
}
