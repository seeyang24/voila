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

class AddVendor extends Component {

    state = {
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '',
        email: '',
        website: '',
        vendor_id: ''
    }

    componentDidMount() {
        this.getVendorType();
    }

    getVendorType = () => {
        this.props.dispatch({ type: 'GET_VENDOR_TYPE'})   
    }

    // Change the states with each input made
    handleChange= propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
     }

    // add vendor on submit to POST
    handleAddVendor = () => {
        this.props.dispatch({
            type: 'CREATE_VENDOR',
            payload: this.state
        })
        this.setState({
            firstName: '',
            lastName: '',
            companyName: '',
            phoneNumber: '',
            email: '',
            website: '',
            vendor_id: ''
        });
        Swal.fire(
            'Success!',
            'Vendor has been added!',
            'success'
            )
        this.props.handleClose();
    }
      
    render() {

        const { classes } = this.props;

        // map through the vendor type list and list them into menu items to select
        const vendorTypeList = this.props.vendorTypeReducer.map( (vendor) => {
            return (
                <MenuItem key={vendor.id} value={vendor.id}>{vendor.name}</MenuItem>
            )
        })
        
        return (
            <div>
                <Dialog
                    open={this.props.state.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                    onKeyDown={stopPropagationForTab}
                >
                    <DialogContent dividers>
                        <DialogTitle className={classes.dialogTitle}>Add New Vendor</DialogTitle>
                    </DialogContent>
                    <DialogContent>
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
                            label="Company Name"
                            type="text"
                            fullWidth
                            value={this.state.companyName}
                            onChange={this.handleChange('companyName')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Phone Number"
                            type="text"
                            fullWidth
                            value={this.state.phoneNumber}
                            onChange={this.handleChange('phoneNumber')}
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
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Website"
                            type="text"
                            fullWidth
                            value={this.state.website}
                            onChange={this.handleChange('website')}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="vendor_id">Select Vendor Type</InputLabel>
                            <Select
                                value={this.state.vendor_id}
                                onChange={this.handleChange('vendor_id')}
                        >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {vendorTypeList}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleAddVendor()} color="secondary" variant="contained">
                            <SaveIcon className={classes.leftIcon} />
                            Add Vendor
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    vendorTypeReducer: state.vendorTypeReducer
});

export default withStyles(styles) (connect(mapStateToProps)(AddVendor));