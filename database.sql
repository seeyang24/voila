
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- database name: voila

CREATE TABLE "role" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50)
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "firstName" VARCHAR (50),
    "lastName" VARCHAR (50),
    "email" VARCHAR (200),
    "dropboxUrl" VARCHAR (1000),
    "agent_id" INT REFERENCES "user"(id),
    "role_id" INT REFERENCES "role" NOT NULL,
    "date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "vendorType" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100)
);

CREATE TABLE "vendor" (
	"id" SERIAL PRIMARY KEY,
	"firstName" VARCHAR (50),
	"lastName" VARCHAR (50),
	"companyName" VARCHAR (150),
	"phoneNumber" VARCHAR (50),
	"email" VARCHAR (200),
	"website" VARCHAR (200),
	"vendor_id" INT REFERENCES "vendorType"
);

CREATE TABLE "journey" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100) NOT NULL
);

CREATE TABLE "journeyStep" (
	"id" SERIAL PRIMARY KEY,
	"journey_id" INT REFERENCES "journey",
	"name" VARCHAR (100),
	"description" VARCHAR (1000),
	"order" INT
	
);

CREATE TABLE "userStep" (
	"id" SERIAL PRIMARY KEY,
	"journeyStep_id" INT REFERENCES "journeyStep",
	"completed" BOOLEAN DEFAULT FALSE,
	"user_id" INT REFERENCES "user" ON DELETE CASCADE,
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP,
	"date_time_completed" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP	
);


CREATE TABLE "searchCriteria" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"numRooms" VARCHAR(50),
	"numBath" VARCHAR (50),
	"numSF" VARCHAR (50),
	"location" VARCHAR (100),
	"notes" VARCHAR (500),
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "house" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"address" VARCHAR(150),
	"MLS_number" VARCHAR (50),
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "offerMade" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"name" VARCHAR (150),
	"address" VARCHAR(150),
	"price" VARCHAR (50),
	"closingDate" DATE,
	"earnestMoney" VARCHAR (50),
	"downPayment" VARCHAR (50),
	"sellerPaidClosingCosts" VARCHAR (100),
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "offerAccepted" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"address" VARCHAR(150),
	"MLS_number" VARCHAR (50),
	"price" VARCHAR (50),
	"ernestMoney" VARCHAR (50),
	"downPayment" VARCHAR (50),
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "selectedInspector" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"name" VARCHAR(150),
	"inspectionDate" DATE,
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "selectedInsurance" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"name" VARCHAR(150),
	"insuranceStartDate" DATE,
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "appraisal" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"requested" BOOLEAN DEFAULT FALSE,
	"scheduled" BOOLEAN DEFAULT FALSE,
	"scheduleDate" DATE,
	"completed" BOOLEAN DEFAULT FALSE,
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "title" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"ordered" BOOLEAN DEFAULT FALSE,
	"completed" BOOLEAN DEFAULT FALSE,
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "finalWalkThrough" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"location" VARCHAR(150),
	"date" VARCHAR(40),
	"time" VARCHAR (25),
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "closing" (
	"id" SERIAL PRIMARY KEY,
	"userStep_id" INT REFERENCES "userStep" ON DELETE CASCADE,
	"location" VARCHAR(150),
	"date" VARCHAR(40),
	"time" VARCHAR (25),
	"toBring" VARCHAR (500),
	"date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP
);


-- Data to set up initial tables:

INSERT INTO "role" ("name")
VALUES ('agent'), ('agent team member'), ('client');

INSERT INTO "journey"
("name")
VALUES ('buyer'), ('seller');

INSERT INTO "journeyStep"
	("journey_id", "name", "description", "order")
VALUES 
	(1, 'Voila Buyer', 'Being a Voila buyer means you are in the best of hands! We are here to help you find the home for you!', 1),
	(1, 'Pre-Approval', 'This the process of getting the loan or funding to purchase a property. The Mortgage company will likely ask for  in-depth documentation on your financial history as well as need to pull a copy of credit report. Don''t worry, this is normal and necessary to make the rest of the process easier moving forward.', 2),
	(1, 'On The Hunt', 'This is the fun part! We will use all of today''s technology at our disposal to work together in finding you the perfect home! Once we have located some contenders online you can use the "Request a showing" button below to request a time and day to take a look in person. If we happen to see the perfect home, and you want to take the next step you can click the "Make an Offer" button below and we can get the process started.', 3),
	(1, 'Executed Offer', 'Once we have submitted an offer to purchase, and both parties (buyer/seller) agree to terms, the purchase will continue moving forward.', 4),
	(1, 'Earnest Money Submission', 'Earnest money is similar to a deposit, which will be held in a Trust Account by the listing broker and will be applied to your down payment. Please note that the earnest money will be deducted from your account within 48hrs of submitting.', 5),
	(1, 'Inspection', 'This is where you will be able to hire a third party inspector to come in and give you a general scope and condition of the property.', 6),
	(1, 'Insurance', 'Time to get your new home insured! The Lender will need proof of this ASAP.', 7),
	(1, 'Appraisal & Title', 'Your Lender will hire an appraiser to verify the home is worth the amount you are paying. Your Title Company is working on verifying there aren''t any Liens or outstanding mortgages or encumbrances on your new property.', 8),
	(1, 'Final Walk Through', 'The purpose of a final walkthrough is to make certain that the property is in the condition in which you agreed to buy it.', 9),
	(1, 'Closing Disclosure', 'This is what you will receive from your Lender a minimum of 3 days prior to closing showing the financial breakdown and fees associated with the purchase.', 10),
	(1, 'Closing Day', 'Here you can find the day, time and location of the closing, as well as what you will need to bring with you. Congratulations on your NEW HOME!', 11);

INSERT INTO "vendorType"
("name")
VALUES ('Insurance Partners'), ('Inspection Partners');

