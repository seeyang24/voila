import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './voilaLogin.png'
import './LoginPage.css'

//Material-ui imports
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

  body: {
    background: '#FFFFFF',
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#FFFFFF'
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});



class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="loginback">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <div>
              <img src={logo} alt="" width="300px" height="200px" />
            </div>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="Username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.login}
              >
                Sign In
        </Button>

            </form>
          </div>
        </Container>
      </div>
    )
  }
}


// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
