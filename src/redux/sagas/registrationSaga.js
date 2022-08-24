import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username, password and all other user info from the payload to the server. server 
    const response = yield axios.post('/api/user/register', action.payload);
    //if action.payload.startBuyer = ture then run create a buyer journey
    if (action.payload.journey){
      yield axios.post(`/api/journey/${response.data[0].id}`)
      console.log('TRYING TO POST', response.data[0].id)
    }
    // call the get saga upon posting a client
    yield put({ type: 'FETCH_CLIENT'});
    // call the get saga upon posting an admin
    yield put ({ type:'FETCH_ADMIN'})
    // call the get saga upon posting a new vendor
    yield put ({ type:'FETCH_VENDOR'})

    // // automatically log a user in after registration
    // yield put({ type: 'LOGIN', payload: action.payload });
    
    // // set to 'login' mode so they see the login screen
    // // after registration or after they log out
    // yield put({type: 'SET_TO_LOGIN_MODE'});
  } catch (error) {
      console.log('Error with user registration:', error);
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
