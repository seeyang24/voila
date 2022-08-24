import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateClient from './UpdateClient'

//material-ui imports
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { ListItemIcon, IconButton, ListItemText, ListItemSecondaryAction, Link } from '@material-ui/core';

const styles = theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});


class ClientItem extends Component {
    state = {
        open: false,
    }
    updateClient = () => {
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
                    <IconButton href={`#/buyer-journey/${this.props.client.id}`}>
                        <HomeIcon />
                    </IconButton>
                </ListItemIcon>
                <ListItemText secondary={<>Agent: {this.props.client.agent}</>}>
                    <Link href={`#/buyer-journey/${this.props.client.id}`}>
                        {this.props.client.firstName} {this.props.client.lastName}
                    </Link>
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton edge="end" color="secondary" aria-label="edit" onClick={this.updateClient}>
                        <EditIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                {this.state.open ? <UpdateClient open={this.state.open} updateClient={this.updateClient} handleClose={this.handleClose} clientId={this.props.client.id} client={this.props.client} /> : <div></div>}
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default withStyles(styles)(withRouter(connect(mapStateToProps)(ClientItem)));

