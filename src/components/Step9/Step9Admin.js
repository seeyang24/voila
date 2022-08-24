import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Step9.css';
import AddFinal from './AddFinal';

// MATERIAL UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Button }from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const styles = ({
    textField: {
        width: 250
    },
    buttonpadding: {
        marginBottom: 15
    },
  });

class Step9Admin extends Component {

    state = {
        open: false,
    }

    componentDidMount() {
        this.getWalkThrough();
    }

    // sends dispatch to Saga to get walkthrough details
    getWalkThrough = () => {
        this.props.dispatch({
            type: 'GET_FINAL_WALKTHROUGH',
            payload: this.props.userStepId
        })
    }

    // opens the dialog to add final walkthrough details
    handleAdd = () => {
        this.setState({
            open: true
        })
    }

    // closes dialog
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                {/* If no details have been added, show this versus the walkthrough details */}
                {this.props.walkThrough.length === 0 ?
                    <Grid>
                        Please list location, date, and time for the final walkthrough.
                    </Grid>
                :
                    <div className="rootDiv">
                        <TextField label="Location" value={this.props.walkThrough[0].location} multiline rows="3" variant="filled" InputProps={{readOnly: true,}}/>
                        <TextField label="Date" value={this.props.walkThrough[0].date} multiline rows="1" variant="filled" InputProps={{readOnly: true,}}/>
                        <TextField label="Time" value={this.props.walkThrough[0].time} multiline rows="1" variant="filled" InputProps={{readOnly: true,}}/>
                    </div>
                }
                <br />
                <Button className={classes.buttonpadding} onClick={this.handleAdd} variant="outlined">
                    Add Walkthrough  
                </Button>
                {this.state.open ? <AddFinal state={this.state} userStepId ={this.props.userStepId} handleClose={this.handleClose} /> : <div></div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    walkThrough: state.walkThrough
});

Step9Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (connect(mapStateToProps)(Step9Admin));