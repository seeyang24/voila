const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//post route to create offer that was accepted
//get route to view offer that was accepted

router.get('/:id', rejectUnauthenticated, (req, res) => {
    //user/client's userStep_id must be passed through url when request is made
    const userStepId = req.params.id;
    const queryText = `SELECT *
                        FROM "offerAccepted"
                        WHERE "userStep_id" = $1;`;
    pool.query(queryText, [userStepId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting offer data', error);
        res.sendStatus(500);
    })
});

router.post('/criteria', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const userStepId = req.body.userStepId;
    const address = req.body.address;
    const mlsNumber = req.body.mls_number;
    const price = req.body.price;
    const earnestMoney = req.body.earnestMoney;
    const downpayment = req.body.downpayment;
    const queryText = `INSERT INTO "offerAccepted"
                        ("userStep_id", "address", "MLS_number", "price", 
                            "ernestMoney", "downPayment")
                        VALUES
                        ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [userStepId, address, mlsNumber, price, earnestMoney, downpayment])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error creating offer', error);
        res.sendStatus(500);
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "offerAccepted" WHERE id=$1;`;
    pool.query(queryText, [req.params.id])
        .then(() => res.sendStatus(200))
        .catch((error) => {
            console.log('error deleting accpeted offer:', error);
            res.sendStatus(500)            
        })
})
module.exports = router;