import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'


import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import BuyerJourney from '../Journey/BuyerJourney';

import Theme from '../../theme/theme';

import './App.css';
import DashboardAdmin from '../Dashboard/DashboardAdmin';
import AppTopBar from '../AppTopBar/AppTopBar';
import ProfileAdmin from '../Profile/ProfileAdmin';
import UpdateClient from '../Dashboard/Client/UpdateClient';
import UpdateAdmin from '../Dashboard/Admin/UpdateAdmin';
import UpdateVendor from '../Dashboard/Vendor/UpdateVendor';
import Register from '../Register/Register';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <Theme>
          <div>
            <AppTopBar />

            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/home will show the UserPage if the user is logged in.
              Even though it seems like they are different pages, the user is always on localhost:3000/home
              User will be directed to either Client (UserPage) or Admin page (DashboardAdmin) */}
              {this.props.user.role_id === 3 ? (
                <ProtectedRoute exact path="/home" component={UserPage} />
              ) : (
                <ProtectedRoute exact path="/home" component={DashboardAdmin} />
              )}

              {/* IMPORTANT! Comment out this line if you are running a production build! */}
              <Route exact path="/register" component={Register} />
              {/* This works the same as the other protected route, except that if the user is logged in,
              they will see the info page instead. */}
              <ProtectedRoute exact path="/info" component={InfoPage} />
              <ProtectedRoute
                exact
                path="/buyer-journey/:id"
                component={BuyerJourney}
              />
              <ProtectedRoute exact path="/profile" component={ProfileAdmin} />
              <ProtectedRoute
                exact
                path="/updateclient/:id"
                component={UpdateClient}
              />
              <ProtectedRoute
                exact
                path="/updateadmin/:id"
                component={UpdateAdmin}
              />
              <ProtectedRoute
                exact
                path="/updatevendor/:id"
                component={UpdateVendor}
              />

              {/* If none of the other routes matched, we will show a 404. */}
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </Theme>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
