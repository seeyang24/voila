import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import Countdown from 'react-countdown-now';

class Step5Admin extends Component {

    state = {
        now: new Date(),
        start: '',
        offer: {}
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_ACCEPTED_OFFER', payload: {userStepId: this.props.userStepId-1 }})
        setTimeout(() => {
            this.setState({offer: this.props.offerAccepted.find(item => { return item.userStep_id == this.props.userStepId - 1 })})
        }, 250);
    }

    render() {
        const Complete = () => <span>Earnest money time has expired. Please reach out to the client to discuss next steps.</span>;

        return (
            <div>
                {this.props.complete ? <p>User has submitted their earnest money payment. Step Complete!</p>
                :
                    <>{this.state.offer != undefined ? 
                        <div>
                            <h1>Time remaining: </h1>
                            <Typography variant="h2">
                                <Countdown date={new Date(this.state.offer.date_time_created).getTime() + 172800000} daysInHours={true}>
                                    <Complete/>
                                </Countdown>
                            </Typography>
                            <Typography variant="subtitle2">
                            If {this.props.buyerName} has submitted earnest money, upload documentation to the Voila Vault dropbox and mark step complete.
                            </Typography>
                        </div>
                    :
                        ''}
                    </>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    offerAccepted: state.offerAccepted,
});

export default connect(mapStateToProps)(Step5Admin);