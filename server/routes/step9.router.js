const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
    //admin and clients can get final walk-through data
        const userStepId = req.params.id;
        const queryText = `SELECT *
                            FROM "finalWalkThrough"
                            WHERE "userStep_id" = $1 ORDER BY "date_time_created" DESC;`;
        console.log(userStepId)
        pool.query(queryText,[userStepId])
        .then((result)=>{
            res.send(result.rows);
        }).catch((error)=>{
            console.log('error getting final walk-through details', error);
            res.sendStatus(500);
        })
    });

    router.post('/', rejectUnauthenticated, (req, res) => {
        //agent can add info about the final walk-through 
        const userStepId = req.body.userStep_id;
        const location = req.body.location;
        const date = req.body.date;
        const time = req.body.time;

        const queryText = `INSERT INTO "finalWalkThrough" 
                            ("userStep_id", "location", "date", "time")
                            VALUES ($1, $2, $3, $4);`;
        pool.query(queryText,[userStepId, location, date, time])
        .then((result)=>{
            res.sendStatus(201);
        }).catch((error)=>{
            console.log('error adding final walkthrough data', error);
            res.sendStatus(500);
        })
    });

module.exports = router;