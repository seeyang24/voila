import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import clientsSaga from './clientSaga';
import vendorsSaga from './vendorSaga';
import adminsSaga from './adminSaga';
import agentSaga from './agentSaga';
import buyerJourneySaga from './buyerJourneySaga';
import adminTypesSaga from './adminTypeSaga';
import vendorsTypesSaga from './vendorTypeSaga';
import offerAcceptedSaga from './offerAcceptedSaga';
import onTheHuntSaga from './onTheHuntSaga';
import step6and7Saga from './step6and7Saga';
import walkThroughSaga from './walkThroughSaga';
import mailerSaga from './mailerSaga';
import ClosingSaga from './closingSaga';
import step8Saga from './step8Saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    clientsSaga(),
    vendorsSaga(),
    adminsSaga(),
    agentSaga(),
    buyerJourneySaga(),
    adminTypesSaga(),
    vendorsTypesSaga(),
    offerAcceptedSaga(),
    onTheHuntSaga(),
    step6and7Saga(),
    walkThroughSaga(),
    mailerSaga(),
    ClosingSaga(),
    step8Saga(),
  ]);
}
