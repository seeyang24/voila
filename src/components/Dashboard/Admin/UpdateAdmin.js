import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Swal from 'sweetalert2'

//material-ui imports
import { TextField, Select, FormControl, InputLabel, MenuItem, Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    formContainer: {
        margin: '25px'
    },
    submitBtn: {
        position: 'relative',
        bottom: -30
    },
    select: {
        minWidth: 120
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),

    },
})
//this component  updates admin information.
class UpdateAdmin extends Component {

    state = {
        firstName: this.props.admin.firstName,
        lastName: this.props.admin.lastName,
        email: this.props.admin.email,
        adminType: this.props.admin.role_id,
        id: this.props.admin.id
    }

    componentDidMount = () => {
        this.getAdmin();
        this.getAdminType();
    }
    getAdmin = () => {
        this.props.dispatch({ type: 'FETCH_ADMIN' })
    }

    getAdminType = () => {
        this.props.dispatch({ type: 'GET_ADMIN_TYPE' })
    }

    handleChange = (event, keyname) => {
        this.setState({
            ...this.state,
            [keyname]: event.target.value,
        })
    }

    handleSubmit = () => {
        this.props.dispatch({ type: 'UPDATE_ADMIN', payload: this.state })
        Swal.fire(
            'Success!',
            'Admin has been updated!',
            'success'
        )
        this.props.handleClose();
    }

    handleDelete = () => {
        Swal.fire({
            title: `Do you want to remove ${this.state.firstName} ${this.state.lastName}?`,
            text: "This action cannot be undone.",
            icon: "warning",
            confirmButtonColor: '#af1419',
            showCancelButton: true,
            style: styles.swalDelete,
        })
            .then((result) => {
                if (result.value) {
                    this.props.dispatch({ type: 'DELETE_ADMIN', payload: this.state.id });
                    setTimeout(() => {
                        Swal.fire({
                            title: "Deleted",
                            text: "This admin has been deleted.",
                            confirmButtonColor: '#af1419',
                            icon: "success",
                        });
                    }, 100);

                }
            });
        this.props.handleClose();
    }

    render() {
        const adminTypes = this.props.state.adminTypeReducer.map((type) => {
            return <MenuItem value={type.id}
                key={type.id}> {type.name}</MenuItem>
        })
        const { classes } = this.props;
        return (
            <div >
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent dividers>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={this.props.handleClose}>
                            <CancelIcon fontSize="large" color="secondary" />
                        </IconButton>
                        <DialogTitle id="form-dialog-title" >Update Admin</DialogTitle>

                    </DialogContent>
                    <DialogContent>
                        <TextField
                            label="First name"
                            placeholder="e.g. Jane"
                            value={this.state.firstName}
                            onChange={(event) => { this.handleChange(event, 'firstName') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            label="Last name"
                            placeholder="e.g. Doe"
                            value={this.state.lastName}
                            onChange={(event) => { this.handleChange(event, 'lastName') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />


                        <TextField
                            label="Email"
                            placeholder="Emaill"
                            value={this.state.email}
                            onChange={(event) => { this.handleChange(event, 'email') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />
                        <FormControl className={classes.select}>
                            <InputLabel id="selectAdminTypeLabel">Admin  Type</InputLabel>
                            <Select
                                labelId="selectAdminTypeLabel"
                                onChange={(event) => { this.handleChange(event, 'adminType') }}
                                value={this.state.adminType}
                            >
                                <MenuItem value={''}>--Select An Admin Type--</MenuItem>
                                {adminTypes}
                            </Select>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={this.handleDelete} color="secondary">
                            Delete
                        </Button>
                        <Button variant="contained" onClick={this.handleSubmit} color="secondary">
                            <SaveIcon className={(classes.leftIcon, classes.iconSmall)} />
                            Update Admin
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
});

export default withStyles(styles)(withRouter(connect(mapStateToProps)(UpdateAdmin)));
