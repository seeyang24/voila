const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

//GET route to get list of agents needed when client is created
router.get('/agent', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "id", "firstName"
                      FROM "user"
                      WHERE "role_id" = 1;`;
  pool.query(queryText)
  .then((result)=>{
    res.send(result.rows);
  }).catch((error)=>{
    console.log('error getting list of agents', error);
    res.sendStatus(500);
  })
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  //create user and return id of created user
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const dropboxUrl = req.body.dropboxUrl;
  const agentId = req.body.agent_id;
  const role = req.body.role_id;

  console.log(req.body, '---POSTING REGISTER USER')
  const queryText = `INSERT INTO "user"
                      ("username", "password", "firstName", "lastName", 
                      "email", "dropboxUrl", "agent_id", "role_id") 
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                      RETURNING id;`;
  pool.query(queryText, [username, password, firstName, lastName, email, dropboxUrl, agentId, role])
    .then((result) => {console.log(result.rows); res.send(result.rows)})
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
