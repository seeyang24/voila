import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddClosing from './AddClosing';
import './Step11.css';

// MATERIAL UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Button, Grid, TextField }from '@material-ui/core';

const styles = ({
    textField: {
        width: 250
    },
    buttonpadding: {
        marginBottom: 15
    },
    contentDiv: {
        maxWidth: 200, 
    }
  });

class Step11Admin extends Component {

    state = {
        open: false
    }

    componentDidMount() {
        this.getClosingDetails();
    }

    // sends dispatch to Saga to get walkthrough details
    getClosingDetails = () => {
        this.props.dispatch({
            type: 'FETCH_CLOSING_DATA',
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
                {this.props.closing.length === 0 ?
                <Grid>
                    Please list location, date, time, and any items needed for Closing Day.
                </Grid>
                :
                    <div className="rootDiv" >
                        <TextField label="Location" value={this.props.closing[0].location} multiline rows="3" variant="filled" InputProps={{readOnly: true,}}/>
                        <TextField label="Date" value={this.props.closing[0].date} multiline rows="1" variant="filled" InputProps={{readOnly: true,}}/>
                        <TextField label="Time" value={this.props.closing[0].time} multiline rows="1" variant="filled" InputProps={{readOnly: true,}}/>
                        <TextField label="Things to Bring" value={this.props.closing[0].toBring} multiline rows="3" variant="filled" InputProps={{readOnly: true,}}/>
                    </div>
                }
                <br />
                <Button className={classes.buttonpadding} onClick={this.handleAdd} variant="outlined">
                    Add Closing Details  
                </Button>
                {this.state.open ? <AddClosing state={this.state} userStepId ={this.props.userStepId} handleClose={this.handleClose} /> : <div></div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    closing: state.closing,
});

Step11Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (connect(mapStateToProps)(Step11Admin));