import React, { Component } from 'react';
import { connect } from 'react-redux';

class Step3Admin extends Component {

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_CRITERIA', payload: this.props.userStepId});
        this.props.dispatch({type: 'GET_SHOWING', payload: this.props.userStepId});
        this.props.dispatch({type: 'GET_OFFER_MADE', payload: this.props.userStepId});
    }

    render() {

        if(this.props.showing.loading){
            return <div>loading...</div>
        }

        return (
            <div>
                <div className="showUser">
                    <h1>Current User</h1> <b>{this.props.buyerFirstName} {this.props.buyerLastName}</b>
                </div>
                <br/>
                <div className="adminCriteria">
                    <h1>User's Criteria</h1> 
                    {this.props.criteria.length !== 0 ? 
                    <>
                    {this.props.criteria.map(criteria => {    
                        return <div className="criteria">
                            <p key={criteria.id}>
                                Bedroom Count: {''}  
                                <b>{criteria.numRooms}</b>
                                <br/>
                                Bathroom Count: {''}
                                <b>{criteria.numBath}</b>
                                <br/>
                                Square Feet: {''}
                                <b>{criteria.numSF}</b>
                                <br/>
                                Location: {''}
                                <b>{criteria.location}</b>
                                <br/>
                                Additional Comments: {''}
                                <b>{criteria.notes}</b>
                                </p>
                            </div>
                            })}
                        </>
                    :
                    <>
                        {`${this.props.buyerFirstName} has not added any search criteria.`}
                    </>
                }
                </div>
                <br/>
                <div className="adminRequestShowing"> 
                    <>
                        <h1>Last Showing Requested</h1> 
                        {this.props.showing.values.length ? 
                        <>
                            {this.props.showing.values[0].address}
                            <br/>
                            MLS #: {''}
                            <b>{this.props.showing.values[0].MLS_number}</b>
                        </>
                        :    
                        <>
                            {`${this.props.buyerFirstName} has not requested a showing.`}
                        </>
                    }
                    </>
                </div>
                <br/>
                <div className="adminOfferMade">
                    <h1>Offers Made</h1>
                    {this.props.offerMade.length !== 0 ?
                    <>
                    {this.props.offerMade.map(offer => {
                        return <div key={offer.id}>
                        {offer.address}
                        {offer.price}
                        {offer.closingDate}
                        {offer.earnestMoney}
                        {offer.downPayment}
                        {offer.sellerPaidClosingCosts}
                    </div>
                    })}
                    </>
                    :
                    <>
                        {`${this.props.buyerFirstName} has not made an offer yet.`}
                    </>
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    criteria: state.criteria,
    showing: state.showing,
    offerMade: state.offerMade
});

export default connect(mapStateToProps)(Step3Admin);