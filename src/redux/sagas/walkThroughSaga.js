import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// GET request for walkthrough information
function* getFinalWalkThrough(action) {
    try {
        const response = yield axios.get(`/api/step9/${action.payload}`);
        yield put({ type: 'SET_FINAL_WALKTHROUGH', payload: response.data })
    } catch (error) {
        console.log('** ERROR GETTING Walkthrough', error);
    }
}

// Post to the database with newly added final walkthrough information
function* postFinalWalkThrough(action) {
    try {
        yield axios.post(`/api/step9`, action.payload);
        // pass along the userStep_id and call the getfinalwalkthrough saga to run
        yield put({ type: 'GET_FINAL_WALKTHROUGH', payload: action.payload.userStep_id})
    } catch (error) {
        console.log('** ERROR POSTING FINAL WALKTHROUGH **', error);
    }
}

function* walkThroughSaga() {
    yield takeLatest('GET_FINAL_WALKTHROUGH', getFinalWalkThrough);
    yield takeLatest('POST_FINAL_WALKTHROUGH', postFinalWalkThrough);
}

export default walkThroughSaga;