const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');



router.get('/vendors', rejectUnauthenticated, (req, res) => {
    //GET and return all insurance vendors
    const queryText = `SELECT *
                        FROM "vendor"
                        WHERE "vendor_id" = 1;`;
    pool.query(queryText)
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting insurance partners', error);
        res.sendStatus(500);
    })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    //GET and return insruance details user added
    const userStepId = req.params.id;
    const queryText = `SELECT *
                        FROM "selectedInsurance"
                        WHERE "userStep_id" = $1
                        ORDER BY "date_time_created" DESC;`;
    pool.query(queryText, [userStepId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting insurance details', error);
        res.sendStatus(500);
    })
});


router.post('/', rejectUnauthenticated, (req, res) => {
    //create user's insurance details
    const userStepId = req.body.user_step_id;
    const insuranceName = req.body.name;
    const startDate = req.body.date;
    const queryText = `INSERT INTO "selectedInsurance"
                        ("userStep_id", "name", "insuranceStartDate")
                        VALUES 
                        ($1, $2, $3);`;
    pool.query(queryText, [userStepId, insuranceName, startDate])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error creating insurance details', error);
        res.sendStatus(500);
    })
});

module.exports = router;