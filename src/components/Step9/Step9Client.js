import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Step9.css';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = ({
    textField: {
        width: 250
    },
  });

class Step9Client extends Component {

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

    render() {

        return (
            <div>
                {/* if there are no data for the user in the closing reducer, show "Your Agent will list the closing details" */}
                {this.props.walkThrough.length === 0 ?
                    <Grid>
                        Your agent will list the final walkthrough details.
                    </Grid>
                :
                // else, show this
                <div className="rootDiv">
                    <TextField label="Location" value={this.props.walkThrough[0].location} multiline rows="3" variant="filled" InputProps={{readOnly: true,}}/>
                    <TextField label="Date" value={this.props.walkThrough[0].date} multiline rows="1" variant="filled" InputProps={{readOnly: true,}}/>
                    <TextField label="Time" value={this.props.walkThrough[0].time} multiline rows="1" variant="filled" InputProps={{readOnly: true,}}/>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    walkThrough: state.walkThrough,
});

Step9Client.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (connect(mapStateToProps)(Step9Client));