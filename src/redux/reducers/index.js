import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import criteria from './criteriaReducer';
import userJourney from './buyerJourneyReducer';
import clientList from './clientListReducer';
import vendorList from './vendorReducer';
import adminList from './adminReducer';
import agent from './agentReducer';
import adminTypeReducer from './adminTypeReducer';
import vendorTypeReducer from './vendorTypeReducer';
import offerAccepted from './offerAcceptedReducer';
import showing from './showingReducer';
import selectedInspector from './selectedInspectorReducer';
import offerMade from './offerMadeReducer';
import selectedInsurance from './selectedInsurance';
import walkThrough from './walkthroughReducer';
import closing from './closingReducer';
import appraisal from './appraisalReducer';
import title from './titleReducer';
import inspectorList from './inspectorListReducer';
import insuranceList from './insuranceListReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  criteria, // will contain client's home search criteria
  userJourney,
  clientList,//this will contain all the clients for the client tab on admin side
  vendorList,//this will contain all the vendors for the vendor tab on the admin side
  adminList,//this will contain all the vendors for the vendor tab on the admin side
  agent,
  adminTypeReducer,
  vendorTypeReducer,
  offerMade, // contains offer made by buyer
  offerAccepted, // contains the details of offer that was accepted (address, MLS, amount, down, earnest money)
  showing, // contains showings requested by buyer
  selectedInspector,
  selectedInsurance,
  walkThrough, // contains final walkthrough details for Step 9
  closing, // contains closing data for Step 11
  appraisal,
  title,
  inspectorList,
  insuranceList,
});

export default rootReducer;
