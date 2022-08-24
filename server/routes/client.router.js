const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

router.get('/', rejectUnauthenticated, (req, res) => {
//admin can get all clients from database
    const queryText = `SELECT a."id", a."firstName", a."lastName", a."dropboxUrl", CONCAT(b."firstName", ' ', b."lastName") AS agent
                        FROM "user" a
                        INNER JOIN "user" b ON b.id = a.agent_id
                        WHERE a."role_id" = 3;`;
    pool.query(queryText)
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting clients', error);
        res.sendStatus(500);
    })
});


router.put('/', rejectUnauthenticated, (req, res) => {
    //agent can update one client's info
    console.log('put router',req.body);
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dorpboxLink = req.body.dropbox;
    const agent = req.body.agentId;
    const clientId = req.body.id;
    const queryText = `UPDATE "user"
                        SET "firstName" = $1, "lastName" = $2, 
                        "dropboxUrl" = $3, "agent_id" = $4
                        WHERE "id" = $5;`;
    pool.query(queryText,[firstName, lastName, dorpboxLink, agent, clientId])
    .then(()=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating client', error);
        res.sendStatus(500);
    })
});

router.put('/password', rejectUnauthenticated, (req, res) => {
    //agent can update one client's info
    console.log('put router',req.body);
    
    const password = encryptLib.encryptPassword(req.body.password);
    const clientId = req.body.id;
    const queryText = `UPDATE "user"
                        SET "password" = $1
                        WHERE "id" = $2;`;
    pool.query(queryText,[password,  clientId])
    .then(()=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating client', error);
        res.sendStatus(500);
    })
});

router.delete('/', rejectUnauthenticated, (req, res) => {
    //admin can delete a client
    const clientId = req.body.id
    const queryText = `DELETE 
                        FROM "user"
                        WHERE id = $1;`;
    pool.query(queryText, [clientId])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error deleting client', error);
        res.sendStatus(500);
    })
});

module.exports = router;