var { Client } = require("pg")
var express = require("express")
var configuration = require("./configuration")

var app = express()

app.use(express.static("public"))

app.use(express.json())

let dbConnection

app.get('/api/health', async function(request, response) {
  response.json({ status: 'healthy' })
})

app.get("/api/characters", async function(request, response) {
  var results = await dbConnection.query(`
    SELECT *
    FROM characters
  `)

  console.log(results.rows)
  response.json(results.rows)
})

app.get("/api/characters/:id", async function(request, response) {
  var id = request.params.id

  var results = await dbConnection.query(`
    SELECT *
    FROM characters
    WHERE id = $1
  `, [id])

  console.log(results.rows[0])
  response.json(results.rows[0])
})

app.post("/api/characters", async function(request, response) {
  var newCharacter = {
    characterName: request.body["characterName"],
    hp: request.body["hp"],
    attack: request.body["attack"],
    defense: request.body["defense"],
    speed: request.body["speed"]
  }
  console.log(newCharacter)

  var sql = `
    INSERT INTO characters (character_name, hp, attack, defense, speed)
    VALUES ($1, $2, $3, $4, $5)
  `
  var values = [newCharacter.characterName, newCharacter.hp, newCharacter.attack, newCharacter.defense, newCharacter.speed]

  await dbConnection.query(sql, values)

  response.json(newCharacter)
})

app.put("/api/characters/:id", async function(request, response) {
  var character = {
    id: request.params.id,
    characterName: request.body["characterName"],
    hp: request.body["hp"],
    attack: request.body["attack"],
    defense: request.body["defense"],
    speed: request.body["speed"]
  }
  console.log(character)

  var sql = `
    UPDATE characters
    SET character_name = $1,
        hp = $2,
        attack = $3,
        defense = $4,
        speed = $5
    WHERE id = $6
  `
  var values = [character.characterName, character.hp, character.attack, character.defense, character.speed, character.id]

  await dbConnection.query(sql, values)

  response.json(character)
})

app.delete("/api/characters/:id", async function(request, response) {
  var id = request.params.id

  await dbConnection.query(`
    DELETE FROM characters
    WHERE id = $1
  `, [id])

  var message = { msg: "Deleted character" }
  console.log(message)
  response.json(message)
})

app.post("/api/characters/:char1_id/vs/:char2_id/simulate", async function(request, response) {
  var char1Id = request.params.char1_id
  var char2Id = request.params.char2_id

  var char1Result = await dbConnection.query(`SELECT * FROM characters WHERE id = $1`, [char1Id])
  var char2Result = await dbConnection.query(`SELECT * FROM characters WHERE id = $1`, [char2Id])

  var char1 = char1Result.rows[0]
  var char2 = char2Result.rows[0]

  var char1Hp = char1.hp
  var char2Hp = char2.hp

  var turns = []
  var turnNumber = 1

  while (char1Hp > 0 && char2Hp > 0) {
    var first = char1.speed >= char2.speed ? char1 : char2
    var second = char1.speed >= char2.speed ? char2 : char1
    var firstHp = char1.speed >= char2.speed ? char1Hp : char2Hp
    var secondHp = char1.speed >= char2.speed ? char2Hp : char1Hp

    var damage1 = Math.max(first.attack - second.defense, 1)
    secondHp = secondHp - damage1

    if (char1.speed >= char2.speed) {
      char2Hp = secondHp
    } else {
      char1Hp = secondHp
    }

    turns.push({
      turn: turnNumber,
      attacker: first.character_name,
      defender: second.character_name,
      damage: damage1,
      defenderHp: Math.max(secondHp, 0)
    })

    if (secondHp <= 0) break

    var damage2 = Math.max(second.attack - first.defense, 1)
    firstHp = firstHp - damage2

    if (char1.speed >= char2.speed) {
      char1Hp = firstHp
    } else {
      char2Hp = firstHp
    }

    turns.push({
      turn: turnNumber,
      attacker: second.character_name,
      defender: first.character_name,
      damage: damage2,
      defenderHp: Math.max(firstHp, 0)
    })

    if (firstHp <= 0) break

    turnNumber++
  }

  var winner = char1Hp > 0 ? char1.character_name : char2.character_name

  response.json({ winner, turns })
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
