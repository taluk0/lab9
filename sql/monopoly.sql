-- This SQL script builds a monopoly database, deleting any pre-existing version.
--
-- @author kvlinden, Nana Osei AY
-- @version Summer, 2015
--

-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS PlayerGame;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Player;

-- Create the schema.
CREATE TABLE Game (
	ID integer PRIMARY KEY,
	time timestamp
	);

CREATE TABLE Player (
	ID integer PRIMARY KEY, 
	emailAddress varchar(50) NOT NULL,
	name varchar(50)
	);

CREATE TABLE PlayerGame (
	gameID integer REFERENCES Game(ID), 
	playerID integer REFERENCES Player(ID),
	score integer,
	cash money,
    houses integer,
    hotels integer,
    properties integer,
    current_location integer
	);

-- Allow users to select data from the tables.
GRANT SELECT ON Game TO PUBLIC;
GRANT SELECT ON Player TO PUBLIC;
GRANT SELECT ON PlayerGame TO PUBLIC;

-- Add sample records.
INSERT INTO Game VALUES (1, '2006-06-27 08:00:00');
INSERT INTO Game VALUES (2, '2006-06-28 13:20:00');
INSERT INTO Game VALUES (3, '2006-06-29 18:41:00');

INSERT INTO Player(ID, emailAddress) VALUES (1, 'me@calvin.edu');
INSERT INTO Player VALUES (2, 'king@gmail.edu', 'The King');
INSERT INTO Player VALUES (3, 'dog@gmail.edu', 'Dogbreath');

INSERT INTO PlayerGame VALUES (1, 1, 0.00, 7, 8, 5, 7, 6);
INSERT INTO PlayerGame VALUES (1, 2, 0.00, 2, 1, 4, 5, 9);
INSERT INTO PlayerGame VALUES (1, 3, 2350.00, 4, 2, 6, 8);
INSERT INTO PlayerGame VALUES (2, 1, 1000.00, 9, 0, 6, 5);
INSERT INTO PlayerGame VALUES (2, 2, 0.00, 1, 5, 3, 2, 4);
INSERT INTO PlayerGame VALUES (2, 3, 500.00, 8, 0, 7, 5, 4);
INSERT INTO PlayerGame VALUES (3, 2, 0.00, 3, 8, 9, 0, 8);
INSERT INTO PlayerGame VALUES (3, 3, 5500.00, 7, 0, 7, 8, 9);