const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
    //admin and clients can get data on closing day
        const userStepId = req.params.id;
        const queryText = `SELECT *
                            FROM "closing"
                            WHERE "userStep_id" = $1 ORDER BY "date_time_created" DESC;`;
        pool.query(queryText,[userStepId])
        .then((result)=>{
            res.send(result.rows);
        }).catch((error)=>{
            console.log('error getting closing day details', error);
            res.sendStatus(500);
        })
    });

    router.post('/', rejectUnauthenticated, (req, res) => {
        //agent can add info about closing day 
        const userStepId = req.body.userStepId;
        const location = req.body.location;
        const date = req.body.date;
        const time = req.body.time;
        const toBring = req.body.toBring;
        const queryText = `INSERT INTO "closing" 
                            ("userStep_id", "location", "date", "time", "toBring")
                            VALUES ($1, $2, $3, $4, $5);`;
        pool.query(queryText,[userStepId, location, date, time, toBring])
        .then((result)=>{
            res.sendStatus(201);
        }).catch((error)=>{
            console.log('error adding closing info', error);
            res.sendStatus(500);
        })
    });

module.exports = router;