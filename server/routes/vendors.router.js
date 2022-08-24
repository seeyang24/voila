const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText = `SELECT "vendor".id, "firstName", "lastName", 
                        "companyName", "phoneNumber", "email", 
                        "website", "name" AS vendor_Type_Name, 
                        "vendorType".id AS vendor_type_id
                            FROM "vendor"
                        JOIN "vendorType"
                            ON "vendorType".id = "vendor".vendor_id;`;
    pool.query(queryText,)
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting vendors', error);
        res.sendStatus(500);
    })
});

router.get('/type', rejectUnauthenticated, (req, res) => {

    const queryText = `SELECT *
                        FROM "vendorType";`;
    pool.query(queryText,)
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting vendor types', error);
        res.sendStatus(500);
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const companyName = req.body.companyName;
    const phone = req.body.phoneNumber;
    const email = req.body.email;
    const website = req.body.website;
    const vendorTypeId = req.body.vendor_id;
    const queryText = `INSERT INTO "vendor"
                        ("firstName", "lastName", "companyName", "phoneNumber", "email", "website", "vendor_id")
                        VALUES
                        ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(queryText, [firstName, lastName, companyName, phone, email, website, vendorTypeId])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error creating new vendor', error);
        res.sendStatus(500);
    })
});

router.put('/', rejectUnauthenticated, (req, res) => {
    const vendorId = req.body.id
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const companyName = req.body.companyName;
    const phone = req.body.phoneNumber;
    const email = req.body.email;
    const website = req.body.website;
    const vendorTypeId = req.body.vendorTypeId;
    const queryText = `UPDATE "vendor"
	                    SET "firstName" = $1, "lastName" = $2, "companyName" = $3, "phoneNumber" = $4, 
		                    "email" = $5, "website" = $6, "vendor_id" = $7
                        WHERE "id" = $8;`;
    pool.query(queryText, [firstName, lastName, companyName, phone, email, website, vendorTypeId, vendorId])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating vendor', error);
        res.sendStatus(500);
    })
});


router.delete('/', rejectUnauthenticated, (req, res) => {
    const vendorId = req.body.id;
    console.log(req.body.id);
    
    const queryText = `DELETE 
                        FROM "vendor"
                        WHERE id = $1;`;
    pool.query(queryText, [vendorId])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error deleting vendor', error);
        res.sendStatus(500);
    })
});


module.exports = router;