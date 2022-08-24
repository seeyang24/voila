// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// MATERIAL UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ProfileAdmin from '../Profile/ProfileAdmin'
import VoilaLogo from './VoilaHeader.png';

const styles = {
  root: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  grow: {
    flexGrow: 1,
    marginLeft: -220,
    position: 'relative'
  },
};

class AppTopBar extends Component {
  state = {
    opens: false,
    anchorEl: null,
    addProfileAdmin: false,
  };

  // opens the menu
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  // close the menu 
  handleClose = () => {
    this.setState({ anchorEl: null, addProfileAdmin: false, });
  };

  // set the Profile dialog to true to open it
  handleProfileAdmin = () => {
    this.setState({
      addProfileAdmin: true,
    });
  }

  // set the Profile dialog to false to close it
  closeProfileAdmin = () => {
    this.setState({
      addProfileAdmin: false,
    });
  }

  // log out sets anchorEl back to null, and addprofileadmin to false
  // so that upon relogin, both will stay closed.
  handleLogOut = () => {
    this.props.dispatch({ type: 'LOGOUT' });
    this.setState({
      addProfileAdmin: false,
      anchorEl: null
    });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root} >
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" className={classes.grow} component={Link} to="/home" disableRipple align="left" justify="left">
              <img src={VoilaLogo} width="85px" align="center" />
            </Button>
            {this.props.user.username ?
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}

                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={this.state.anchorEl}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleProfileAdmin} >Profile </MenuItem>
                  {this.state.addProfileAdmin ? <ProfileAdmin state={this.state} ProfileAdmin={this.ProfileAdmin} handleClose={this.handleClose} closeProfileAdmin={this.closeProfileAdmin} /> : null}
                  <MenuItem component={Link} to="/home" onClick={this.handleLogOut}>Log Out</MenuItem>
                </Menu>
              </div>
              :
              <div></div>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles(styles)(connect(mapStateToProps)(AppTopBar));