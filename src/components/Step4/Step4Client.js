import React, { Component } from 'react';
import { connect } from 'react-redux';
import OfferAcceptedDisplay from './OfferAcceptedDisplay';

class Step4Client extends Component {

    componentDidMount(){
        this.props.dispatch({type: 'GET_ACCEPTED_OFFER', payload: {userStepId: this.props.userStepId}})
    }

    matchOfferToUser = () => {
        const offer = this.props.offerAccepted.find(offer => {return offer.userStepId === this.props.userStepId});
        return offer;
    }

    render() {
        return (
            <div>
                {this.props.offerAccepted.loading ? 
                    <p>...loading...</p> 
                :
                    <>
                        {this.props.offerAccepted.length === 0 ? 
                            <p>No offers have been accepted at this time.</p> 
                        :
                            <OfferAcceptedDisplay offer={this.props.offerAccepted.find(offer => { return offer.userStep_id === this.props.userStepId })}/>
                        }
                    </>
                } 
            </div>
        );
    }
}

const mapStateToProps = state => ({
    offerAccepted: state.offerAccepted,

});

export default connect(mapStateToProps)(Step4Client);