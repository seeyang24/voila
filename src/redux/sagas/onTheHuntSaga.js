import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function that posts buyer's criteria to database
function* postCriteria(action) {
    try{
        yield axios.post('/api/step3/criteria', action.payload);
        console.log('posting criteria', action.payload);
        yield put({type: 'GET_CRITERIA', payload: action.payload.user_step_id});
    }catch (error) {
        console.log('error with posting criteria', error)
    }
}

// Function that gets buyer's criteria from database
function* getCriteria(action) {
    try{
        const response = yield axios.get('/api/step3/criteria/' + action.payload)
        console.log('this is user criteria', response.data)
        yield put ({type: 'SET_CRITERIA', payload: response.data});
    }catch (error) {
        console.log('error with getting criteria', error);
    }
}

// Function that updates buyer's criteria in database
function* updateCriteria(action) {
    try{
        yield axios.put('/api/step3/criteria', action.payload);
        console.log('updating criteria', action.payload);
        yield put({type: 'GET_CRITERIA', payload: action.payload.user_step_id});
    }catch (error) {
        console.log('error with updating criteria', error);
    }
}

// Function that posts buyer's showing request to database
function* postShowing(action) {
    try{
        yield axios.post('/api/step3/showing/', action.payload);
        console.log('posting showing request', action.payload);
        yield put({type: 'GET_SHOWING', payload: action.payload.user_step_id});
    }catch (error) {
        console.log('error with posting showing request', error)
    }
}

// Function that gets buyer's showing request from database
function* getShowing(action) {
    try{
        const response = yield axios.get('/api/step3/showing/' + action.payload)
        console.log('this is showing request', response.data)
        yield put ({type: 'SET_SHOWING', payload: response.data});
    }catch (error) {
        console.log('error with getting showing', error);
    }
}

// Function that posts buyer's offer made to database
function* postOfferMade(action) {
    try{
        axios.post('/api/step3/offer', action.payload);
        console.log('posting offer made', action.payload);
    }catch (error) {
        console.log('error with posting offer made', error)
    }
}

// Function that gets buyer's offers made from database
function* getOfferMade(action) {
    try{
        const response = yield axios.get('/api/step3/offer/' + action.payload);
        console.log('getting offer made', response.data);
        yield put({type: 'SET_OFFER_MADE', payload: response.data});
    }catch (error) {
        console.log('error getting offer made', error)
    }
}

// When TYPE is hit, corresponding function will fire off
function* onTheHuntSaga() {
    yield takeLatest('POST_CRITERIA', postCriteria)
    yield takeLatest('GET_CRITERIA', getCriteria)
    yield takeLatest('UPDATE_CRITERIA', updateCriteria)
    yield takeLatest('POST_SHOWING', postShowing)
    yield takeLatest('GET_SHOWING', getShowing)
    yield takeLatest('POST_OFFER_MADE', postOfferMade)
    yield takeLatest('GET_OFFER_MADE', getOfferMade)
}

export default onTheHuntSaga;