DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_name VARCHAR(255),
  hp INT,
  attack INT,
  defense INT,
  speed INT
);

INSERT INTO characters (character_name, hp, attack, defense, speed)
VALUES ('Shect', 100, 30, 15, 20);

INSERT INTO characters (character_name, hp, attack, defense, speed)
VALUES ('Shalinth', 100, 25, 20, 18);

INSERT INTO characters (character_name, hp, attack, defense, speed)
VALUES ('Valize', 100, 20, 25, 22);
