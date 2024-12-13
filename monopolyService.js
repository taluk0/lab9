// Set up the database connection.

const pgp = require("pg-promise")();

const db = pgp({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Configure the server and its routes.

const express = require("express");

const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
router.use(express.json());

router.get("/", readHelloMessage);
router.get("/players", readPlayers);
router.get("/players/:id", readPlayer);
router.get("/join", readJoin);
router.put("/players/:id", updatePlayer);
router.post("/players", createPlayer);
router.delete("/players/:id", deletePlayer);

app.use(router);
app.listen(port, () => console.log(`Listening on port ${port}`));

// Implement the CRUD operations.

function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}

function readHelloMessage(req, res) {
  res.send("Hello, CS 262 Monopoly service for Lab 9");
}

function readPlayers(req, res, next) {
  db.many("SELECT * FROM Player")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}
function readJoin(req, res, next) {
  db.many(
    "SELECT gameID, playerID, player.ID, emailAddress  FROM PlayerGame INNER JOIN Player ON playerID = Player.ID"
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function readPlayer(req, res, next) {
  db.oneOrNone("SELECT * FROM Player WHERE id=${id}", req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function updatePlayer(req, res, next) {
  db.oneOrNone(
    "UPDATE Player SET email=${body.email}, name=${body.name} WHERE id=${params.id} RETURNING id",
    req
  )
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function createPlayer(req, res, next) {
  db.one(
    "INSERT INTO Player(email, name) VALUES (${email}, ${name}) RETURNING id",
    req.body
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function deletePlayer(req, res, next) {
  db.oneOrNone("DELETE FROM Player WHERE id=${id} RETURNING id", req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}
