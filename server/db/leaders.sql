  DROP TABLE IF EXISTS leader;

  CREATE TABLE leader (
    leader_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    party VARCHAR(100) NOT NULL,
    country_id INT,
    PRIMARY KEY (leader_id),
    FOREIGN KEY(country_id) REFERENCES country(country_id)
);

INSERT INTO leader (name, age, party, country_id)
VALUES
  ('Luiz Inácio Lula da Silva', 79, 'Workers Party', 1),
  ('Andrés Manuel López Obrador', 70, 'National Regeneration Movement', 2),
  ('Joe Biden', 81, 'Democratic Party', 3),
  ('Narendra Modi', 73, 'Bharatiya Janata Party', 4),
  ('Xi Jinping', 70, 'Chinese Communist Party', 5),
  ('Vladimir Putin', 71, 'United Russia', 6),
  ('Fumio Kishida', 66, 'Liberal Democratic Party', 7),
  ('Cyril Ramaphosa', 71, 'African National Congress', 8),
  ('Anthony Albanese', 62, 'Australian Labor Party', 8);