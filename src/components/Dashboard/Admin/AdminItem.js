import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import EditIcon from '@material-ui/icons/Edit';
import UpdateAdmin from './UpdateAdmin';
import { ListItemIcon, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';


class AdminItem extends Component {
    state = {
        open: false,
        showLevel: false,
    }
    updateAdmin = () => {
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
        return (
            <>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <>
                            {this.props.admin.firstName} {this.props.admin.lastName}
                        </>}
                    secondary={
                        <>
                            {this.props.admin.role_name.charAt(0).toUpperCase() + this.props.admin.role_name.slice(1)}
                            <br />
                            {this.props.admin.email}
                        </>}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" color="secondary" aria-label="edit" onClick={this.updateAdmin}>
                        <EditIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                {this.state.open ?
                    <UpdateAdmin open={this.state.open} state={this.state} updateAdmin={this.updateAdmin} handleClose={this.handleClose} admin={this.props.admin} />
                    :
                    <div></div>
                }
            </>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
});

export default connect(mapStateToProps)(AdminItem);