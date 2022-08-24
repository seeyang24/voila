import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Swal from 'sweetalert2'

//material-ui imports
import { withStyles } from '@material-ui/core/styles';
import {
    TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button,
    InputLabel, MenuItem, FormControl, FormControlLabel, Select, Switch
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),

    },
    swalDelete: {
        position: 'relative',
        zIndex: 10000,
    }
});

class UpdateClient extends Component {

    state = {
        firstName: this.props.client.firstName,
        lastName: this.props.client.lastName,
        dropbox: this.props.client.dropboxUrl,
        agentId: this.props.client.agent_id,
        isBuyer: true,
        id: this.props.clientId
    }

    // switch on Buyer Journey, true or false
    handleSwitch = journey => event => {
        this.setState({ [journey]: event.target.checked });
    };

    componentDidMount = () => {
        this.getAgents();
        this.getClients();
    }

    getAgents = () => {
        this.props.dispatch({ type: 'GET_AGENT' })
    }

    getClients = () => {
        this.props.dispatch({ type: 'FETCH_CLIENT' })
    }

    handleChange = (event, keyname) => {
        this.setState({
            ...this.state,
            [keyname]: event.target.value,
        })
    }

    handleSubmit = () => {
        this.props.dispatch({
            type: 'UPDATE_CLIENT',
            payload: this.state

        })
        Swal.fire(
            'Success!',
            'Client has been updated!',
            'success'
        )
        this.props.handleClose();
    }

    handleDelete = () => {
        Swal.fire({
            title: `Do you want to remove ${this.state.firstName} ${this.state.lastName}?`,
            text: "This action cannot be undone.",
            confirmButtonColor: '#af1419',
            icon: "warning",
            showCancelButton: true,
            style: styles.swalDelete,
        })
            .then((result) => {
                if (result.value) {
                    this.props.dispatch({ type: 'DELETE_CLIENT', payload: this.state.id });
                    setTimeout(() => {
                        Swal.fire({
                            title: "Deleted",
                            text: "This client has been deleted.",
                            confirmButtonColor: '#af1419',
                            icon: "success",
                        });
                    }, 100);

                }
            });
        this.props.handleClose();
    }

    render() {
        const agentOptions = this.props.state.agent.map((agent) => {
            return <MenuItem value={agent.id}
                key={agent.id}> {agent.firstName}</MenuItem>
        })
        const { classes } = this.props;

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent dividers>
                        <DialogTitle id="form-dialog-title" >Update Client</DialogTitle>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={this.props.handleClose}>
                            <CancelIcon fontSize="large" color="secondary" />
                        </IconButton>
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            label="First Name"
                            placeholder="e.g. Jane"
                            value={this.state.firstName}
                            onChange={(event) => { this.handleChange(event, 'firstName') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            placeholder="e.g. Doe"
                            value={this.state.lastName}
                            onChange={(event) => { this.handleChange(event, 'lastName') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            label="Dropbox URL"
                            placeholder="Copy and paste dropbox url"
                            value={this.state.dropbox}
                            onChange={(event) => { this.handleChange(event, 'dropbox') }}
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                        />

                        <FormControl className={classes.formControl}>
                            <InputLabel id="selectAgentLabel">Agent</InputLabel>
                            <Select
                                labelId="selectAgentLabel"
                                onChange={(event) => { this.handleChange(event, 'agentId') }}
                                value={this.state.agentId}
                            >
                                <MenuItem value={''}>--Select An Agent--</MenuItem>
                                {agentOptions}
                            </Select>
                        </FormControl>
                        <br></br>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.journey}
                                    onChange={this.handleSwitch('journey')}
                                    value="journey"
                                />
                            }
                            label="Start Buyer Journey"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={this.handleDelete} color="secondary">
                            Delete
                        </Button>
                        <Button variant="contained" onClick={this.handleSubmit} color="secondary">
                            <SaveIcon className={(classes.leftIcon, classes.iconSmall)} />
                            Update Client
                        </Button>
                    </DialogActions>
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

export default withStyles(styles)(withRouter(connect(mapStateToProps)(UpdateClient)));

