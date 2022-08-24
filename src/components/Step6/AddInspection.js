import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import {withRouter } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';


const styles = {
    formContainer: {
        margin: '25px'
    },
    submitBtn: {
        position: 'relative',
        bottom: -30
    },
    select:{
        minWidth: 120
    }
}

class AddInspector extends Component {
    
    state = {
        name: '',
        date: '',
        user_step_id: this.props.userStepId
    }

    handleChange = (event, keyname) => {
            this.setState({
                [keyname]: event.target.value,
            })
    }

    handleSubmit = () => {
        //if info is not filled out, an allert will request user to add information
        if(this.state.name === '' || this.state.date === ''){
            return ( 
                Swal.fire({
                    text: 'Please enter in an Inspector and Date of Inspection',
                    confirmButtonColor: '#af1419',
                    customClass: {
                        container: 'swal2-container'
                    }
                })
            )
        }
        //if all info is filled out, local state will be dispatched to step6and7Saga.js to be added to database
        this.props.dispatch({
            type: 'ADD_INSPECTION',
            payload:  this.state 
        })

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your inspection has been added.',
            confirmButtonColor: '#af1419',
        })
        //after data is dispatched to saga and success message appears, the pop-up window will close
        this.props.handleClose();
    }


    render() {

        return (
            <div >
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent dividers>
                        <DialogTitle id="form-dialog-title" >Add your Scheduled Inspection</DialogTitle>
                    </DialogContent>
                    <DialogContent>
                    <TextField
                        label="Inspector"
                        placeholder="Inspector"
                        value={this.state.name}
                        onChange={(event) => {this.handleChange(event, 'name')}}
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        label="Inspection Date"
                        value={this.state.date}
                        onChange={(event) => { this.handleChange(event, 'date') }}
                        margin="dense"
                        type="date"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                    />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                        Add Inspection
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

export default withStyles(styles) (withRouter(connect(mapStateToProps)(AddInspector)));
