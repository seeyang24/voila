import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



    function* addInspection(action){
        try{
            yield axios.post('/api/step6', action.payload);
            yield put ({ type:'GET_USER_INSPECTION', payload: action.payload })
        }catch (error){
            console.log('error adding user inspection', error);
        
        }
    }

    function* addInsurance(action){
        try{
            yield axios.post('/api/step7', action.payload);
            yield put ({ type:'GET_USER_INSURANCE', payload: action.payload })
        }catch (error){
            console.log('error adding user insurance', error);
        
        }
    }

    function* getUserInspection(action){
        try{
            const response = yield axios.get(`/api/step6/${action.payload.user_step_id}`);
            yield put ({ type:'SET_USER_INSPECTION', payload: response.data })
        }catch (error){
            console.log('error getting user inspection data', error);
        
        }
    }

    function* getUserInsurance(action){
        try{
            const response = yield axios.get(`/api/step7/${action.payload.user_step_id}`);
            yield put ({ type:'SET_USER_INSURANCE', payload: response.data })
        }catch (error){
            console.log('error getting user insurance data', error);
        
        }
    }


    function* step6and7Saga() {
        yield takeLatest('ADD_INSPECTION', addInspection);
        yield takeLatest('ADD_INSURANCE', addInsurance);
        yield takeLatest('GET_USER_INSPECTION', getUserInspection);
        yield takeLatest('GET_USER_INSURANCE', getUserInsurance);
    }


export default step6and7Saga;