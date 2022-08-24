import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
    TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button,
    InputLabel, MenuItem, FormControl, Select,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import Swal from 'sweetalert2';

// This component should be disabled for any live production build. 
// It is only to be used to create the first user if you are spinning up this project from scratch.
const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'left',
        height: '1vh',
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
});

class Register extends Component {

    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        dropboxUrl: '',
        agent_id: null,
        role_id: 1,
        journey: false,
    }

    // Change the states with each input made
    handleChange = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    // POST data to create new user
    handleAddAdmin = () => {
        this.props.dispatch({
            type: 'REGISTER',
            payload: this.state
        })
        this.setState({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            dropboxUrl: '',
            agent_id: null,
            role_id: 1,
            journey: false,
        });
        Swal.fire(
            'Success!',
            'Admin has been added!',
            'success'
        )
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                />
                <TextField
                    autoFocus
                    label="First Name"
                    type="text"
                    fullWidth
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                />
                <Button onClick={() => this.handleAddAdmin()} color="secondary" variant="contained">
                    <SaveIcon className={classes.leftIcon} />
                    Register
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default withStyles(styles)(connect(mapStateToProps)(Register));