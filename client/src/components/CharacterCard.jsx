import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import ShieldIcon from '@mui/icons-material/Shield'
import BoltIcon from '@mui/icons-material/Bolt'

export default function CharacterCard({ character, onDelete }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {character.character_name}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          <Chip icon={<FavoriteIcon />} label={`HP ${character.hp}`} color="error" size="small" />
          <Chip icon={<SportsKabaddiIcon />} label={`ATK ${character.attack}`} color="warning" size="small" />
          <Chip icon={<ShieldIcon />} label={`DEF ${character.defense}`} color="info" size="small" />
          <Chip icon={<BoltIcon />} label={`SPD ${character.speed}`} color="success" size="small" />
        </Box>
      </CardContent>

      {onDelete && (
        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          <IconButton size="small" color="error" onClick={() => onDelete(character.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      )}
    </Card>
  )
}
