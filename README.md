# Demo Express API

A RESTful API built with **Node.js**, **Express**, and **PostgreSQL**, fully containerized with **Docker Compose**. Built to practice backend fundamentals — REST routing, parameterized SQL queries, and relational data modeling.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL (via the `pg` driver)
- **Container:** Docker Compose

## Endpoints

### Users

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/users` | List all users |
| GET | `/users/:id` | Get a user by ID |
| POST | `/users` | Create a user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

**Request body (POST / PUT):**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "age": 33,
  "weight": 155.1,
  "smoker": false
}
```

### Players

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/players` | List all players |
| GET | `/players/:id` | Get a player by ID |
| POST | `/players` | Create a player |
| PUT | `/players/:id` | Update a player |
| DELETE | `/players/:id` | Delete a player |
| POST | `/players/:player1_id/players/:player2_id/attack` | Player 1 attacks Player 2 |

**Request body (POST / PUT):**
```json
{
  "username": "Shect",
  "level": 70,
  "hp": 1000,
  "attack": 120,
  "defense": 80
}
```

**Attack response:**
```json
{
  "attacker": "Shect",
  "defender": "Shalinth",
  "damage": 20,
  "defenderNewHp": 980
}
```

## Project Structure

```
├── compose.yml          # Docker Compose services (app + db)
├── db/
│   └── setup.sql        # Table schema and seed data
└── src/
    ├── app.js           # Express server and all route handlers
    ├── configuration.js # Database connection config
    └── package.json
```

## Running Locally

Requires [Docker Desktop](https://docs.docker.com/desktop/install/windows-install) (and [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) on Windows).

```sh
# Install dependencies
docker compose run --rm app npm install

# Start the database (wait for "ready to accept connections")
docker compose up -d db

# Start the app
docker compose up -d app
```

Confirm it's running: [http://localhost:3000/health](http://localhost:3000/health)

```sh
# Shut everything down
docker compose down
```
