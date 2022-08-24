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

class AddInsurance extends Component {
    
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
        
        if(this.state.name === '' || this.state.date === ''){
            return ( 
                Swal.fire({
                    text: 'Please enter in an Insurance Agent and start date for your policy',
                    confirmButtonColor: '#af1419',
                    customClass: {
                        container: 'swal2-container'
                    }
                })
            )
        }
    
        this.props.dispatch({
            type: 'ADD_INSURANCE',
            payload:  this.state 
        })

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your insurance has been added.',
            confirmButtonColor: '#af1419',
        })

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
                        <DialogTitle id="form-dialog-title" >Add your Insurance Information</DialogTitle>
                    </DialogContent>
                    <DialogContent>
                    <TextField
                        label="Insurance"
                        placeholder="Insurance"
                        value={this.state.name}
                        onChange={(event) => {this.handleChange(event, 'name')}}
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        label="Policy Start Date"
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
                        Add Insurance
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

export default withStyles(styles) (withRouter(connect(mapStateToProps)(AddInsurance)));
