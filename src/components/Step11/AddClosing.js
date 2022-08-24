import React, { Component } from 'react';
import { connect } from 'react-redux';

// MATERIAL UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Button }from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import Moment from 'moment';

const moment = Moment;

const styles = theme => ({
    textField: {
        width: 250
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'left',
        height: '1vh',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    dialogDiv: {
        align: 'center',
        margin: 'auto',
        justifyContent: 'center'
    },
  });

class AddClosing extends Component {

    state = {
        userStepId: this.props.userStepId,
        location: '',
        date: '',
        time: '',
        toBring: ''
    }
    
    handleChange= propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
        }

    // submits the data to post in the database
    handleComplete = () => {
        this.props.dispatch({
            type: 'POST_CLOSING_DATA',
            payload:{
                userStepId: this.props.userStepId,
                location: this.state.location,
                date: this.state.date = moment(this.state.date).format('MMM Do YYYY'),
                time: this.state.time,
                toBring: this.state.toBring
            }
        })
        this.setState({
            userStep_id: this.props.userStepId,
            location: '',
            date: '',
            time: '',
            toBring: ''
        });
        this.props.handleClose();
    } 

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Dialog
                    open={this.props.state}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                    className={classes.dialogDiv}
                    disableBackdropClick
                >
                    <DialogContent dividers>
                        <DialogTitle className={classes.dialogTitle} >Add Closing Details </DialogTitle>
                    </DialogContent>
                    <DialogContent >
                        <TextField
                            label="Location"
                            value={this.state.location}
                            onChange={this.handleChange('location')}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                }}
                            multiline
                            rows="4"
                            className={classes.textField}
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            label="Date"
                            value={this.state.date}
                            onChange={this.handleChange('date')}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            type="date"
                            className={classes.textField}
                        />
                        <br />
                        <TextField
                            label="Time"
                            value={this.state.time}
                            onChange={this.handleChange('time')}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.textField}
                        />
                        <br />
                        <TextField
                            label="Things to Bring"
                            multiline
                            rows="4"
                            value={this.state.toBring}
                            onChange={this.handleChange('toBring')}
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            className={classes.textField}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} variant="outlined" color="secondary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleComplete} color="secondary" variant="contained">
                        Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    walkThrough: state.walkThrough
});

AddClosing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (connect(mapStateToProps)(AddClosing));