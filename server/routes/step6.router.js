const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');



router.get('/vendors', rejectUnauthenticated, (req, res) => {
    //returns all inspection vendors
    const queryText = `SELECT *
                        FROM "vendor"
                        WHERE "vendor_id" = 2;`;
    pool.query(queryText)
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting inspection partners', error);
        res.sendStatus(500);
    })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    //return inspection details user added
    const userStepId = req.params.id;
    const queryText = `SELECT *
                        FROM "selectedInspector"
                        WHERE "userStep_id" = $1
                        ORDER BY "date_time_created" DESC;`;
    pool.query(queryText, [userStepId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting inspection details', error);
        res.sendStatus(500);
    })
});


router.post('/', rejectUnauthenticated, (req, res) => {
    //create user's inspection details
    const userStepId = req.body.user_step_id;
    const inspectorName = req.body.name;
    const inspectionDate = req.body.date;
    const queryText = `INSERT INTO "selectedInspector"
                        ("userStep_id", "name", "inspectionDate")
                        VALUES 
                        ($1, $2, $3);`;
    pool.query(queryText, [userStepId, inspectorName, inspectionDate])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error creating inspection details', error);
        res.sendStatus(500);
    })
});

module.exports = router;