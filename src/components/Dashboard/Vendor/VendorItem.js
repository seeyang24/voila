import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateVendor from './UpdateVendor';

//material-ui imports
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { ListItemIcon, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';

const styles = theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});

class VendorItem extends Component {
    state = {
        open: false,
    }
    updateVendor = (id) => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false,
        })

    }
    render() {
        const fullName = `${this.props.vendor.firstName} ${this.props.vendor.lastName}`;
        return (
            <>
                <ListItemIcon>
                    <BusinessIcon />
                </ListItemIcon>
                <ListItemText
                    primary={this.props.vendor.companyName}
                    secondary={
                        <>
                            {fullName}
                            <br/>
                            {this.props.vendor.vendor_type_name}
                            <br />
                            {this.props.vendor.phoneNumber}
                            <br/>
                            {this.props.vendor.email}
                        </>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" color="secondary" aria-label="edit" onClick={this.updateVendor}>
                        <EditIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                {this.state.open ?
                    <UpdateVendor open={this.state.open} updateVendor={this.updateVendor} handleClose={this.handleClose} vendorId={this.props.vendorId} vendor={this.props.vendor} />
                    :
                    <div></div>}
            </>

        )
    }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
    user: state.user,
    state
});

export default withStyles(styles)(withRouter(connect(mapStateToProps)(VendorItem)));