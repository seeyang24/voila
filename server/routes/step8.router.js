const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');



router.get('/appraisal/:id', rejectUnauthenticated, (req, res) => {
    //GET and return appraisal data for specific user step
    const userStepId = req.params.id;
    const queryText = `SELECT * FROM "appraisal"
                        WHERE "userStep_id" = $1;`;
    pool.query(queryText, [userStepId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting appraisal data', error);
        res.sendStatus(500);
    })
});

router.get('/title/:id', rejectUnauthenticated, (req, res) => {
    //GET and return title data for specific user step
    const userStepId = req.params.id;
    const queryText = `SELECT *
                        FROM "title"
                        WHERE "userStep_id" = $1;`;
    pool.query(queryText, [userStepId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting appraisal data', error);
        res.sendStatus(500);
    })
});

router.put('/appraisal/date', rejectUnauthenticated, (req, res) => {
    //update appraisal scheuld to true and add date of appraisal
    const userStepId = req.body.user_step_id;
    const date = req.body.date;
    const queryText = `UPDATE "appraisal"
	                    SET "scheduleDate" = $2
                        WHERE "userStep_id" = $1;`;
    pool.query(queryText, [userStepId, date])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error adding scheduled appraisal', error);
        res.sendStatus(500);
    })
});

router.put('/appraisal/schedule', rejectUnauthenticated, (req, res) => {
    //update appraisal scheuld to true and add date of appraisal
    const userStepId = req.body.user_step_id;
    const tureFalse = req.body.value;
    const queryText = `UPDATE "appraisal"
	                    SET "scheduled" = $2
                        WHERE "userStep_id" = $1;`;
    pool.query(queryText, [userStepId, tureFalse])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating appraisal schedule', error);
        res.sendStatus(500);
    })
});

router.put('/appraisal/request', rejectUnauthenticated, (req, res) => {
    //update appraisal scheuld to true and add date of appraisal
    const userStepId = req.body.user_step_id;
    const tureFalse = req.body.value;
    const queryText = `UPDATE "appraisal"
	                    SET "requested" = $2
                        WHERE "userStep_id" = $1;`;
    pool.query(queryText, [userStepId, tureFalse])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error updating appraisal request status', error);
        res.sendStatus(500);
    })
});

router.put('/appraisal/complete', rejectUnauthenticated, (req, res) => {
    //update appraisal scheuld to true and add date of appraisal
    const userStepId = req.body.user_step_id;
    const tureFalse = req.body.value;
    const queryText = `UPDATE "appraisal"
	                    SET "completed" = $2
                        WHERE "userStep_id" = $1;`;
    pool.query(queryText, [userStepId, tureFalse])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error updating appraisal complete status', error);
        res.sendStatus(500);
    })
});

router.put('/title', rejectUnauthenticated, (req, res) => {
    //update appraisal scheuld to true and add date of appraisal
    const userStepId = req.body.user_step_id;
    const tureFalse = req.body.value;
    const queryText = `UPDATE "title"
	                    SET "ordered" = $2
                        WHERE "userStep_id" = $1;`;
    pool.query(queryText, [userStepId, tureFalse])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error updating appraisal complete status', error);
        res.sendStatus(500);
    })
});

router.put('/title/complete', rejectUnauthenticated, (req, res) => {
    //update appraisal scheuld to true and add date of appraisal
    const userStepId = req.body.user_step_id;
    const tureFalse = req.body.value;
    const queryText = `UPDATE "title"
	                    SET "completed" = $2
                        WHERE "userStep_id" = $1;`;
    pool.query(queryText, [userStepId, tureFalse])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error updating appraisal complete status', error);
        res.sendStatus(500);
    })
});

module.exports = router;