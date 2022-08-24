const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    const queryText = `SELECT "userStep".id, "order", "completed", "name", "description"
                        FROM "userStep"
                        JOIN "journeyStep"
                            ON "journeyStep".id = "userStep"."journeyStep_id"
                        WHERE "user_id" = $1
                        ORDER BY "order";`;
    pool.query(queryText, [userId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting user journey data', error);
        res.sendStatus(500);
    })
});
//this route will be hit by an admin account. The axios request sent
// will have to include the client's id
router.get('/admin/:id', rejectUnauthenticated, (req, res) => {
    const userId = req.params.id;
    console.log(req.params);
    
    const queryText = `SELECT "userStep".id, "user_id", "order", "completed", "name", "description", "firstName", "lastName", "email", "dropboxUrl"
                        FROM "userStep"
                        JOIN "journeyStep"
                            ON "journeyStep".id = "userStep"."journeyStep_id"
                        JOIN "user"
                            ON "user".id = "userStep"."user_id"
                        WHERE "user_id" = $1
                        ORDER BY "order";`;
    pool.query(queryText, [userId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting client journey data', error);
        res.sendStatus(500);
    })
});

//route will be hit by admin account. The axios request sent will have to
// include the client's id. It will create a clien's journey steps and the necessary
// entries in the appraisal and title tables
router.post('/:id', rejectUnauthenticated, async (req, res) => {
    const userId = req.params.id;
    const queryText1 = `INSERT INTO "userStep"
	                    ("journeyStep_id", "user_id", "completed" )
                        VALUES 
                        (1, $1, true),
                        (2, $1, false),
                        (3, $1, false),
                        (4, $1, false),
                        (5, $1, false),
                        (6, $1, false),
                        (7, $1, false),
                        (8, $1, false),
                        (9, $1, false),
                        (10, $1, false),
                        (11, $1, false);`;
    const queryText2 = `SELECT "id" 
                        FROM "userStep"
                        WHERE "journeyStep_id" = 8 AND "user_id" = $1;`;
    const queryText3 = `INSERT INTO "appraisal" ("userStep_id")
                        VALUES($1);`;
    const queryText4 = `INSERT INTO "title" ("userStep_id")
                        VALUES ($1);`;
    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');
        await connection.query(queryText1, [userId]);
        const result = await connection.query(queryText2, [userId]);
        await connection.query(queryText3, [result.rows[0].id]);
        await connection.query(queryText4, [result.rows[0].id]);
        await connection.query('COMMIT;');
        res.sendStatus(201);
    } catch {
        await connection.query('ROLLBACK;');
        console.log('error creating steps for user journey');
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});


router.put('/:id', rejectUnauthenticated, (req, res) => {
    //updates a user's journey step complete or not complete
    const userStepId = req.params.id;
    const completed = req.body.complete;
    console.log(req.params.id, req.body);
    
    const queryText = `UPDATE "userStep"
	                    SET "completed" = $2
                        WHERE id = $1;`;
    pool.query(queryText, [userStepId, completed])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error creating client journey', error);
        res.sendStatus(500);
    })
});




module.exports = router;