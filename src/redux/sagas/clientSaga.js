import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get all clients
function* fetchClient() {
  try {
    const response = yield axios.get('/api/client');
    yield put({ type: 'ADD_CLIENT', payload: response.data })
  } catch (error) {
    console.log('error in Fetch', error);

  }
}

function* updateClient(action) {
  try {
    yield axios.put('/api/client', action.payload);
    yield fetchClient();
  } catch (error) {
    console.log('error in PUT', error);

  }
}

// put request to update password
function* updatePassword(action) {
  try {
    yield axios.put('/api/client/password', action.payload);
    yield fetchClient();
  } catch (error) {
    console.log('error in PUT', error);

  }
}

// Send an axios request to delete client
function* deleteClient(action){
  try{
    yield axios.delete(`/api/client`, {data: {id: action.payload}});
    yield fetchClient();
  }catch (err){
    console.log('DELETE ERROR:', err);
  }
}
function* clientsSaga() {
  yield takeLatest('FETCH_CLIENT', fetchClient);
  yield takeLatest('UPDATE_CLIENT', updateClient);
  yield takeLatest('DELETE_CLIENT', deleteClient);
  yield takeLatest('UPDATE_PASSWORD', updatePassword);

}

export default clientsSaga;