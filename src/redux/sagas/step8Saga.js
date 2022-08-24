import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getAppraisal(action){
    try{
        const response = yield axios.get(`/api/step8/appraisal/${action.payload}`);
        yield put ({ type:'SET_APPRAISAL', payload: response.data })
    }catch (error){
        console.log('error getting user appraisal data', error);
    
    }
}

function* getTitle(action){
    try{
        const response = yield axios.get(`/api/step8/title/${action.payload}`);
        yield put ({ type:'SET_TITLE', payload: response.data })
    }catch (error){
        console.log('error getting user title data', error);
    
    }
}

function* updateAppraisalRequested(action){
    try{
        yield axios.put(`/api/step8/appraisal/request`, action.payload);
        yield put ({ type:'GET_APPRAISAL', payload: action.payload.user_step_id})
    }catch (error){
        console.log('error getting user title data', error);
    
    }
}

function* updateAppraisalScheduled(action){
    try{
        yield axios.put(`/api/step8/appraisal/schedule`, action.payload);
        yield put ({ type:'GET_APPRAISAL', payload: action.payload.user_step_id})
    }catch (error){
        console.log('error getting user title data', error);
    
    }
}

function* updateAppraisalCompleted(action){
    try{
        yield axios.put(`/api/step8/appraisal/complete`, action.payload);
        yield put ({ type:'GET_APPRAISAL', payload: action.payload.user_step_id})
    }catch (error){
        console.log('error getting user title data', error);
    
    }
}

function* updateTitleOrdered(action){
    try{
        yield axios.put(`/api/step8/title`, action.payload);
        yield put ({ type:'GET_TITLE', payload: action.payload.user_step_id})
    }catch (error){
        console.log('error getting user title data', error);
    
    }
}

function* updateTitleCompleted(action){
    try{
        yield axios.put(`/api/step8/title/complete`, action.payload);
        yield put ({ type:'GET_TITLE', payload: action.payload.user_step_id})
    }catch (error){
        console.log('error getting user title data', error);
    
    }
}

function* updateAppraisalDate(action){
    try{
        yield axios.put(`/api/step8/appraisal/date`, action.payload);
        yield put ({ type:'GET_APPRAISAL', payload: action.payload.user_step_id})
    }catch (error){
        console.log('error getting user title data', error);
    
    }
}

function* step8Saga() {
    yield takeLatest('GET_APPRAISAL', getAppraisal);
    yield takeLatest('GET_TITLE', getTitle);
    yield takeLatest('UPDATE_APPRAISAL_REQUESTED', updateAppraisalRequested);
    yield takeLatest('UPDATE_APPRAISAL_SCHEDULED', updateAppraisalScheduled);
    yield takeLatest('UPDATE_APPRAISAL_COMPLETED', updateAppraisalCompleted);
    yield takeLatest('UPDATE_TITLE_ORDERED', updateTitleOrdered);
    yield takeLatest('UPDATE_TITLE_COMPLETED', updateTitleCompleted);
    yield takeLatest('UPDATE_APPRAISAL_DATE', updateAppraisalDate);
}

export default step8Saga;