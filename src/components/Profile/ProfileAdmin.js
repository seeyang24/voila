import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField, Dialog, DialogContent, DialogTitle, Button,
} from '@material-ui/core';

import ProfileInfo from './ProfileInfo';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

// stop tab key from closing the dialog box
const stopPropagationForTab = (event) => {
    if (event.key == "p") {
        event.stopPropagation();
    }
};

class ProfileAdmin extends Component {
    state = {
        showpassword: false,
        password: '',
        id: this.props.user.id
    }

    handleChange = (event, keyname) => {
        this.setState({
            ...this.state,
            [keyname]: event.target.value,
        })
    }

    savePassword = () => {
        this.setState({
            showpassword: false,
        })

        this.props.dispatch({
            type: 'UPDATE_PASSWORD',
            payload: this.state

        })
    }

    showPassword = () => {
        this.setState({
            showpassword: true,
        })
    }

    // close the Profile and set everything to false
    closeProfile = () => {
        this.props.handleClose();
        this.props.closeProfileAdmin();
    }

    render() {
        return (
            <div>
                <div></div>
                <Dialog
                    open={this.props.state}
                    onClose={this.props.handleClose}
                    onKeyDown={stopPropagationForTab}
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick
                >
                    <DialogContent dividers>
                        <DialogTitle id="form-dialog-title" >Profile</DialogTitle>
                    </DialogContent>
                    <DialogContent>
                        <ProfileInfo />
                        {this.state.showpassword ?
                            <>
                                <TextField
                                    label="Password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(event) => { this.handleChange(event, 'password') }}
                                    autoFocus
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                />
                                <Button variant="outlined" color="secondary" onClick={this.savePassword}>Save</Button>
                            </> :
                            <Button variant="outlined" color="secondary" onClick={this.showPassword}>
                                Change Password
                            </Button>
                        }
                        <Button variant="outlined" onClick={this.closeProfile} color="secondary">
                            Cancel
                            </Button>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
    agent: state.agent,
    state
});

export default withStyles(styles)(withRouter(connect(mapStateToProps)(ProfileAdmin)));