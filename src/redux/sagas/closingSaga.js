import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClosingData(action) {
    try {
        const response = yield axios.get(`/api/step11/${action.payload}`);
        yield put({ type: 'SET_CLOSING_DATA', payload: response.data })
    } catch (error) {
        console.log('-- ERROR GETTING CLOSING DATA **', error);
    }
}

function* postClosingData(action) {
    try {
        yield axios.post(`/api/step11/`, action.payload);
        yield put({ type: 'FETCH_CLOSING_DATA', payload: action.payload.userStepId})
    } catch (error) {
        console.log('Error posting CLOSING DATA --:', error);
    }
}

function* ClosingSaga() {
    yield takeLatest('FETCH_CLOSING_DATA', fetchClosingData);
    yield takeLatest('POST_CLOSING_DATA', postClosingData);
}

export default ClosingSaga;