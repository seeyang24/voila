import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getUserJourney (){
    try{
        const response = yield axios.get(`/api/journey`);
        yield put({type: 'SET_JOURNEY', payload: response.data});
    }catch (error){
        console.log('error getting journey for this user', error);
    }
}

function* getUserJourneyAdmin (action) {
    try {
        const response = yield axios.get(`/api/journey/admin/${action.user_id}`);
        yield put({type: 'SET_JOURNEY', payload: response.data})
    } catch (error) {
        console.log('error getting journey for user:', error);
        
    }
}

function* completeStep (action) {
    try {
        yield axios.put(`/api/journey/${action.id}`, {complete: action.completed})
        yield getUserJourneyAdmin(action);
    } catch (error) {
        console.log('error completing step', error);
    }
}


function* journeySaga() {
    yield takeLatest('GET_JOURNEY', getUserJourney);
    yield takeLatest('GET_JOURNEY_FOR_USER', getUserJourneyAdmin);
    yield takeLatest('COMPLETE_STEP', completeStep);
    // yield takeLatest('ADD_COLLECTION', addCollection);
  }
  
  export default journeySaga;