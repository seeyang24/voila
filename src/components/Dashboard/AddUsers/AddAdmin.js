import React, {Component} from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button,
        InputLabel, MenuItem, FormControl, Select, } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import Swal from 'sweetalert2';
  
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

  // stop tab key from closing the dialog box
  const stopPropagationForTab = (event) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
    if (event.key == 'a') {
        event.stopPropagation();
    }
    if (event.key === 'A') {
        event.stopPropagation();
    }
  };

class AddAdminDialog extends Component {

    state= {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        dropboxUrl: '',
        agent_id: null,
        role_id: '',
        journey: false,
    }

    // Change the states with each input made
    handleChange= propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
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
            role_id: '',
            journey: false,
        });
        Swal.fire(
            'Success!',
            'Admin has been added!',
            'success'
            )
        this.props.handleClose();
    } 
      
    render() {

        const { classes } = this.props;
        
        return (
            <div>
                <Dialog
                    open={this.props.state.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                    onKeyDown={stopPropagationForTab}
                >
                    <DialogContent dividers>
                        <DialogTitle className={classes.dialogTitle}>Add New Admin</DialogTitle>
                    </DialogContent>
                    <DialogContent>
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
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="role_id">Select Admin Type</InputLabel>
                            <Select
                                value={this.state.role_id}
                                onChange={this.handleChange('role_id')}
                                inputProps={{
                                name: 'role_id',
                                }}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>Agent</MenuItem>
                                <MenuItem value={2}>Agent Team Member</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleAddAdmin()}color="secondary" variant="contained">
                            <SaveIcon className={classes.leftIcon} />
                            Add Admin
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default withStyles(styles) (connect(mapStateToProps) (AddAdminDialog));