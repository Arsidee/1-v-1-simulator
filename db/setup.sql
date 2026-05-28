DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS players;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  age INT,
  weight FLOAT,
  smoker BOOLEAN
);

CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255),
  level INT,
  hp INT,
  attack INT,
  defense INT
);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('John', 'Doe', 35, 183.7, false);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Jane', 'Doe', 33, 155.1, false);

INSERT INTO players (username, level, hp, attack, defense)
VALUES ('Shect', 70, 1000, 120, 80);

INSERT INTO players (username, level, hp, attack, defense)
VALUES ('Shalinth', 70, 1000, 100, 100);

INSERT INTO players (username, level, hp, attack, defense)
VALUES ('Valize', 70, 1000, 90, 125);