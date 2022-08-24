import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//GET all vendors to display to administratos
function* fetchVendor(){
    try{
      const response = yield axios.get('/api/vendor');
      yield put ({ type:'ADD_VENDOR', payload: response.data })
    }catch (error){
      console.log('error in Fetch', error);
      
    }
  }
  //GET list of inspection vendors as provided by agent
  function* getInspectors(){
    try{
      const response = yield axios.get('/api/step6/vendors');
      yield put({type: 'SET_INSPECTORS', payload: response.data});

    } catch (error){
      console.log('error getting inspection vendors');
    }
  }
  //GET list of insruance vendors as provided by agent
  function* getAllInsurance(){
    try{
      const response = yield axios.get('/api/step7/vendors');
      yield put({type: 'SET_INSURANCE', payload: response.data});

    } catch (error){
      console.log('error getting insurance vendors');
    }
  }

  function* updateVendor(action) {
    try {
      yield axios.put('/api/vendor', action.payload);
      yield fetchVendor();
    } catch (error) {
      console.log('error in PUT ADMIN', error);
  
    }
  }
  function* deleteVendor(action){
    try{
      yield axios.delete(`/api/vendor`, {data: {id: action.payload}});
      // after deleting, get newest updates
      yield fetchVendor();
    }catch (err){
      console.log('DELETE ERROR:', err);
    }
  }

  // POST a new vendor
  function* createVendor(action) {
    try {
      yield axios.post(`/api/vendor`, action.payload)
      console.log('---IN POST VENDOR', action.payload);
      yield fetchVendor();
    } catch (error) {
        console.log('Error posting accepted offer:', error);
    }
  }

  function* vendorsSaga() {
    yield takeLatest('FETCH_VENDOR', fetchVendor);
    yield takeLatest('UPDATE_VENDOR', updateVendor);
    yield takeLatest('DELETE_VENDOR', deleteVendor);
    yield takeLatest('GET_INSPECTORS', getInspectors);
    yield takeLatest('CREATE_VENDOR', createVendor);
    yield takeLatest('GET_INSURANCE', getAllInsurance);
  }
  
  export default vendorsSaga;