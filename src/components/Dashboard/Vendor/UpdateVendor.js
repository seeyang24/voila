import React, { Component } from 'react';
import { connect } from 'react-redux';

import Swal from 'sweetalert2'

//material-ui imports

import { TextField, Select, FormControl, InputLabel, MenuItem, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
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

class UpdateVendor extends Component {

    state = {
        firstName: this.props.vendor.firstName,
        lastName: this.props.vendor.lastName,
        companyName: this.props.vendor.companyName,
        phoneNumber: this.props.vendor.phoneNumber,
        email: this.props.vendor.email,
        website: this.props.vendor.website,
        vendorTypeId: '',
        id: this.props.vendor.id
    }

    componentDidMount = () => {
        this.getVendor();
        this.getVendorType();
    }
    getVendor = () => {
        this.props.dispatch({ type: 'FETCH_VENDOR' })
    }
    getVendorType = () => {
        this.props.dispatch({ type: 'GET_VENDOR_TYPE' })
    }


    handleChange = (event, keyname) => {
        this.setState({
            ...this.state,
            [keyname]: event.target.value,
        })
    }

    handleSubmit = () => {
        this.props.history.push('/')
        this.props.dispatch({
            type: 'UPDATE_VENDOR',
            payload: this.state

        })
        Swal.fire(
            'Success!',
            'Vendor  has been updated!',
            'success'
        )
    }

    handleDelete = () => {
        Swal.fire({
            title: `Do you want to remove ${this.state.companyName}?`,
            text: "This action cannot be undone.",
            icon: "warning",
            confirmButtonColor: '#af1419',
            showCancelButton: true,
        })
            .then((result) => {
                if (result.value) {
                    this.props.dispatch({ type: 'DELETE_VENDOR', payload: this.state.id });
                    setTimeout(() => {
                        Swal.fire({
                            title: "Deleted",
                            text: "This vendor has been deleted.",
                            confirmButtonColor: '#af1419',
                            icon: "success",
                        });
                    }, 100);

                }
            });
        this.props.handleClose();
    }
    handleClose = () => {
        this.props.history.push('/')

    }
    render() {
        const vendorType = this.props.state.vendorTypeReducer.map((type) => {
            return <MenuItem value={type.id}
                key={type.id}> {type.name}</MenuItem>
        })
        const { classes } = this.props;
        return (
            <div style={styles.formContainer}>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent dividers>
                        <DialogTitle id="form-dialog-title" >Update Vendor</DialogTitle>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={this.props.handleClose}>
                            <CancelIcon fontSize="large" color="secondary" />
                        </IconButton>
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
                            label="Company Name"
                            placeholder="Company Name"
                            value={this.state.companyName}
                            onChange={(event) => { this.handleChange(event, 'companyName') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            label="Phone"
                            placeholder="Phone"
                            value={this.state.phoneNumber}
                            onChange={(event) => { this.handleChange(event, 'phoneNumber') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(event) => { this.handleChange(event, 'email') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            label="Website"
                            placeholder="Website"
                            value={this.state.website}
                            onChange={(event) => { this.handleChange(event, 'website') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />
                        <FormControl className={classes.select}>
                            <InputLabel id="selectVendorTypeLabel">Vendor Type</InputLabel>
                            <Select
                                labelId="selectVendorTypeLabel"
                                onChange={(event) => { this.handleChange(event, 'vendorTypeId') }}
                                value={this.state.vendorTypeId}
                            >
                                <MenuItem value={''}>--Select Vendor Type--</MenuItem>
                                {vendorType}
                            </Select>
                        </FormControl>


                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={this.handleDelete} color="secondary">
                            Delete
                        </Button>
                        <Button variant="contained" onClick={this.handleSubmit} color="secondary">
                            <SaveIcon className={(classes.leftIcon, classes.iconSmall)} />
                            Update Vendor
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

export default withStyles(styles)(withRouter(connect(mapStateToProps)(UpdateVendor)));
