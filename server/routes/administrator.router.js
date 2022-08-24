const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    //admin can get all clients from database
        const queryText = `SELECT "user".id, "firstName", "lastName", "username", "email", "role_id", "name" as role_name
                            FROM "user"
                            JOIN "role" 
                                ON "role".id = "user".role_id
                            WHERE "role_id" = 1 or "role_id" = 2;`;
        pool.query(queryText,)
        .then((result)=>{
            res.send(result.rows);
        }).catch((error)=>{
            console.log('error getting clients', error);
            res.sendStatus(500);
        })
    });


router.get('/type', rejectUnauthenticated, (req, res) => {

    const queryText = `SELECT *
                        FROM "role";`;
    pool.query(queryText,)
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting admin types', error);
        res.sendStatus(500);
    })
});

router.put('/', rejectUnauthenticated, (req, res) => {
    //agent can update one admin's info
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const adminType = req.body.adminType;
    const userId = req.body.id;
    const queryText = `UPDATE "user"
	                    SET "firstName" = $1, "lastName" = $2, "email" = $3, "role_id" = $4
                        WHERE "id" = $5;`;
    pool.query(queryText,[firstName, lastName, email, adminType, userId])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating admin', error);
        res.sendStatus(500);
    })
});  

router.delete('/', rejectUnauthenticated, (req, res) => {
    //admin can delete another admin
    const userId = req.body.id
    const queryText = `DELETE 
                        FROM "user"
                        WHERE id = $1;`;
    pool.query(queryText, [userId])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error deleting client', error);
        res.sendStatus(500);
    })
});


module.exports = router;