# 1v1 Simulator

A full stack web app where you create characters, build a roster, and simulate turn-by-turn battles between any two fighters.

## Tech Stack

**Frontend**
- React (Vite)
- React Router — page navigation
- Material UI — component library and dark theme

**Backend**
- Node.js + Express — REST API
- PostgreSQL — persistent character storage
- Docker Compose — containerized database and server

## How It Works

1. **Create characters** — give each fighter a name and assign their stats: HP, Attack, Defense, and Speed
2. **Build your roster** — characters are saved to the database and persist between sessions
3. **Pick two fighters** — select any two characters from your roster
4. **Watch the battle** — the simulation plays out turn by turn; the character with higher Speed strikes first each round. Damage = Attacker's Attack minus Defender's Defense (minimum 1)
5. **See the winner** — battle ends when a character's HP hits zero

## Project Structure

```
├── server/              # Express API
│   ├── app.js           # Route handlers + simulation logic
│   ├── configuration.js # Database connection config
│   └── package.json
├── client/              # React frontend (Vite)
│   └── src/
│       ├── pages/       # RosterPage, CreateCharacterPage, SelectFightersPage, BattlePage
│       ├── components/  # CharacterCard
│       └── theme.js     # MUI dark theme
├── db/
│   └── setup.sql        # Schema and seed data
└── compose.yml          # Docker Compose services
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/characters` | List all characters |
| GET | `/api/characters/:id` | Get a character by ID |
| POST | `/api/characters` | Create a character |
| PUT | `/api/characters/:id` | Update a character |
| DELETE | `/api/characters/:id` | Delete a character |
| POST | `/api/characters/:char1_id/vs/:char2_id/simulate` | Simulate a battle |

## Running Locally

Requires [Docker Desktop](https://docs.docker.com/desktop/install/windows-install) (and [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) on Windows) and Node.js 20+.

```sh
# Install server dependencies
docker compose run --rm app npm install

# Start the database (wait for "ready to accept connections")
docker compose up -d db

# Start the Express server
docker compose up -d app

# Install and start the React frontend
cd client
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3000/api/characters](http://localhost:3000/api/characters)

```sh
# Shut down when done
docker compose down
```
