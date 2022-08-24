import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Countdown from 'react-countdown-now';

class Step5Client extends Component {

    state = {
        now: new Date(),
        start: '',
        offer: {}
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ACCEPTED_OFFER', payload: { userStepId: this.props.userStepId - 1 } })
        setTimeout(() => {
            this.setState({ offer: this.props.offerAccepted.find(item => { return item.userStep_id == this.props.userStepId - 1 }) })
        }, 250);
    }

    render() {
        const Complete = () => <span>Earnest money time has expired. Please reach out to your agent to discuss next steps.</span>;

        return (
            <div>
                {this.props.complete ? <p>You've submitted your earnest money payment!</p>
                    :
                    <>{this.state.offer != undefined ?
                        <div>
                            <h1>Time remaining to submit earnest money:</h1>
                            <Typography variant="h2">
                                <Countdown date={new Date(this.state.offer.date_time_created).getTime() + 172800000} daysInHours={true}>
                                    <Complete />
                                </Countdown>
                            </Typography>
                            <p>If you've already submitted your earnest money payment, please contact your agent to proceed to the Inspection step.</p> 
                        </div>
                        :
                        <h1>Once your offer has been accepted, you have 48 hours to submit earnest money.</h1>}
                    </>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    offerAccepted: state.offerAccepted,
});

export default connect(mapStateToProps)(Step5Client);