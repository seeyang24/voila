import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAcceptedOffer(action) {
    try {
        const response = yield axios.get(`/api/step4/${action.payload.userStepId}`);
        yield put({ type: 'SET_ACCEPTED_OFFER', payload: response.data })
    } catch (error) {
        console.log('error getting accepted offer', error);
    }
}

function* addAcceptedOffer(action) {
    try {
        yield axios.post(`/api/step4/criteria`, action.payload);
        yield getAcceptedOffer(action);
    } catch (error) {
        console.log('Error posting accepted offer:', error);
    }
}

function* deleteAcceptedOffer(action) {
    try {
        yield axios.delete(`/api/step4/${action.payload.id}`);
        yield getAcceptedOffer(action);
    } catch (error) {
        console.log('Error deleting accpeted offer:', error);
    }
}

function* offerAcceptedSaga() {
    yield takeLatest('GET_ACCEPTED_OFFER', getAcceptedOffer);
    yield takeLatest('ADD_ACCEPTED_OFFER', addAcceptedOffer);
    yield takeLatest('DELETE_ACCEPTED_OFFER', deleteAcceptedOffer);
}

export default offerAcceptedSaga;