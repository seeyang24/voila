import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAgent() {
    try {
        const response = yield axios.get(`/api/user/agent`);
        yield put({ type: 'SET_AGENT', payload: response.data });
    } catch (error) {
        console.log('error getting agent', error);
    }
}

function* agentSaga() {
    yield takeLatest('GET_AGENT', getAgent);
}

export default agentSaga;