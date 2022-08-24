import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Step11.css';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles =  ({
    textField: {
        width: 250
    },
  });

class Step11Client extends Component {

    componentDidMount() {
        this.getClosingDetails();
    }

    // fetch closing details inputted by the Admin
    getClosingDetails = () => {
        this.props.dispatch({
            type: 'FETCH_CLOSING_DATA',
            payload: this.props.userStepId
        })
    }

    render() {

        return (
            <div>
                {/* if there are no data for the user in the closing reducer, show "Your Agent will list the closing details" */}
                {this.props.closing.length === 0 ?
                    <Grid>
                        Your agent will list the closing details.
                    </Grid>
                :
                // else, show this
                <div className="rootDiv">
                    <h2>Congratulations on your <br/> NEW HOME!</h2>
                    <TextField label="Location" value={this.props.closing[0].location} multiline rows="3" variant="filled" InputProps={{readOnly: true,}}/>
                    <TextField label="Date" value={this.props.closing[0].date} multiline rows="1" variant="filled" InputProps={{readOnly: true,}}/>
                    <TextField label="Time" value={this.props.closing[0].time} multiline rows="1" variant="filled" InputProps={{readOnly: true,}}/>
                    <TextField label="Things to Bring" value={this.props.closing[0].toBring} multiline rows="3" variant="filled" InputProps={{readOnly: true,}}/>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    closing: state.closing,
});

Step11Client.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (connect(mapStateToProps)(Step11Client));