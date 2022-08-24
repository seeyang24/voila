import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function that emails criteria from buyer to admin
function* emailCriteria(action) {
    try{
        yield axios.post('/nodemailer/criteria', action.payload);
        console.log('emailing criteria', action.payload);
    }catch(error) {
        console.log('error sending email', error);
    }
};

// Function that emails showings requested from buyer to admin
function* emailShowing(action) {
    try{
        yield axios.post('/nodemailer/showing', action.payload);
        console.log('emailing showing', action.payload);
    }catch(error) {
        console.log('error sending email', error);
    }
};

// Function that emails offers made from buyer to admin
function* emailOffer(action) {
    try{
        yield axios.post('/nodemailer/offer', action.payload);
        console.log('emailing offer', action.payload);
    }catch(error) {
        console.log('error sending email', error);
    }
};

// When TYPE is hit, corresponding function will fire off
function* mailerSaga() {
    yield takeLatest('EMAIL_CRITERIA', emailCriteria)
    yield takeLatest('EMAIL_SHOWING', emailShowing)
    yield takeLatest('EMAIL_OFFER_MADE', emailOffer)
}

export default mailerSaga;