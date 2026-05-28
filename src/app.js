var { Client } = require("pg")
var express = require("express")
var configuration = require("./configuration")

var app = express()

app.use(express.static("public"))

app.use(express.json())

let dbConnection // This is initialized when the server starts

app.get('/health', async function(request, response) {
  response.json({ status: 'healthy' });
})

app.get("/users", async function(request, response) {
  var results = await dbConnection.query(`
    SELECT *
    FROM users
  `)

  console.log(results.rows)
  response.json(results.rows)
})

app.get("/users/:id", async function(request, response) {
  var id = request.params.id

  var results = await dbConnection.query(`
    SELECT *
    FROM users
    WHERE id = $1
  `, [id])

  console.log(results.rows[0])
  response.json(results.rows[0])
})

app.post("/users", async function(request, response) {
  var newUser = {
    firstName: request.body["firstName"],
    lastName: request.body["lastName"],
    age: request.body["age"],
    weight: request.body["weight"],
    smoker: request.body["smoker"]
  }
  console.log(newUser)

  var sql = `
    INSERT INTO users (first_name, last_name, age, weight, smoker)
    VALUES ($1, $2, $3, $4, $5)
  `
  var values = [newUser["firstName"], newUser["lastName"], newUser["age"], newUser["weight"], newUser["smoker"]]

  await dbConnection.query(sql, values)

  response.json(newUser)
})

app.put("/users/:id", async function(request, response) {
  var user = {
    id: request.params.id,
    firstName: request.body["firstName"],
    lastName: request.body["lastName"],
    age: request.body["age"],
    weight: request.body["weight"],
    smoker: request.body["smoker"]
  }
  console.log(user)

  var sql = `
    UPDATE users
    SET first_name = $1,
        last_name = $2,
        age = $3,
        weight = $4,
        smoker = $5
    WHERE id = $6
  `
  var values = [user["firstName"], user["lastName"], user["age"], user["weight"], user["smoker"], user["id"]]

  await dbConnection.query(sql, values)

  response.json(user)
})

app.delete("/users/:id", async function(request, response) {
  var id = request.params.id

  var sql = `
    DELETE FROM users
    WHERE id = $1
  `
  await dbConnection.query(sql, [id])

  var message = { msg: "Deleted user" }
  console.log(message)
  response.json(message)
})

app.get("/players", async function(request, response) {
  var results = await dbConnection.query(`
    SELECT *
    FROM players
  `)

  console.log(results.rows)
  response.json(results.rows)
})

app.get("/players/:id", async function(request, response) {
  var id = request.params.id

  var results = await dbConnection.query(`
    SELECT *
    FROM players
    WHERE id = $1
  `, [id])

  console.log(results.rows[0])
  response.json(results.rows[0])
})

app.post("/players", async function(request, response) {
  var newPlayer = {
    username: request.body["username"],
    level: request.body["level"],
    hp: request.body["hp"],
    attack: request.body["attack"],
    defense: request.body["defense"]
  }
  console.log(newPlayer)

  var sql = `
    INSERT INTO players (username, level, hp, attack, defense)
    VALUES ($1, $2, $3, $4, $5)
  `
  var values = [newPlayer["username"], newPlayer["level"], newPlayer["hp"], newPlayer["attack"], newPlayer["defense"]]

  await dbConnection.query(sql, values)

  response.json(newPlayer)
})

app.put("/players/:id", async function(request, response) {
  var player = {
    id: request.params.id,
    username: request.body["username"],
    level: request.body["level"],
    hp: request.body["hp"],
    attack: request.body["attack"],
    defense: request.body["defense"]
  }
  console.log(player)

  var sql = `
    UPDATE players
    SET username = $1,
        level = $2,
        hp = $3,
        attack = $4,
        defense = $5
    WHERE id = $6
  `
  var values = [player["username"], player["level"], player["hp"], player["attack"], player["defense"], player["id"]]

  await dbConnection.query(sql, values)

  response.json(player)
})

app.delete("/players/:id", async function(request, response) {
  var id = request.params.id

  var sql = `
    DELETE FROM players
    WHERE id = $1
  `
  await dbConnection.query(sql, [id])

  var message = { msg: "Deleted player" }
  console.log(message)
  response.json(message)
})

app.post("/players/:player1_id/players/:player2_id/attack", async function(request, response) {
  var player1Id = request.params.player1_id
  var player2Id = request.params.player2_id

  var player1Result = await dbConnection.query(`SELECT * FROM players WHERE id = $1`, [player1Id])
  var player2Result = await dbConnection.query(`SELECT * FROM players WHERE id = $1`, [player2Id])

  var player1 = player1Result.rows[0]
  var player2 = player2Result.rows[0]

  var damage = player1.attack - player2.defense
  if (damage < 5) {
    damage = 5
  }

  var newHp = player2.hp - damage

  await dbConnection.query(`UPDATE players SET hp = $1 WHERE id = $2`, [newHp, player2Id])

  response.json({
    attacker: player1.username,
    defender: player2.username,
    damage: damage,
    defenderNewHp: newHp
  })
})

var client = new Client(configuration)
client.connect()
  .then(function() {
    dbConnection = client
    console.log("[Connected to the database]")

    app.listen(3000, function() {
      console.log("> Server listening on http://localhost:3000")
    })
  })

module.exports = app
