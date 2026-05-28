import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import RosterPage from './pages/RosterPage'
import CreateCharacterPage from './pages/CreateCharacterPage'
import SelectFightersPage from './pages/SelectFightersPage'
import BattlePage from './pages/BattlePage'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RosterPage />} />
          <Route path="/create" element={<CreateCharacterPage />} />
          <Route path="/simulate" element={<SelectFightersPage />} />
          <Route path="/battle" element={<BattlePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
