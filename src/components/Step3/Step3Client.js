import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComponentToUpdate from './ComponentToUpdate';
import { Button, Divider } from '@material-ui/core';

const styles = {
    button: {
        marginBottom: '10px'
    }
}

class Step3Client extends Component {

    state = {
        buyer_first_name: this.props.buyerFirstName,
        buyer_last_name: this.props.buyerLastName,
        user_step_id: this.props.userStepId,
        showComponentToUpdate: false,
        showCriteria: false,
        showRequest: false,
        showOffer: false
    }

   componentDidMount = () => {
    this.props.dispatch({type: 'GET_JOURNEY'});
    this.props.dispatch({type: 'GET_CRITERIA', payload: this.state.user_step_id});
    this.props.dispatch({type: 'GET_SHOWING', payload: this.state.user_step_id});
}

    // Function will toggle between showing component to change criteria and step page
    addCriteriaToggle = () => {
        this.setState({
            showCriteria: !this.state.showCriteria,
            showComponentToUpdate: !this.state.showComponentToUpdate
        });
    }

    // Function will toggle between showing component to change criteria and step page
    updateCriteriaToggle = () => {
        this.setState({
            showCriteria: !this.state.showCriteria,
            showComponentToUpdate: !this.state.showComponentToUpdate
        });
    }

    // Function will toggle between showing component to request showing and step page
    requestShowingToggle = () => {
        this.setState({
            showRequest: !this.state.showRequest,
            showComponentToUpdate: !this.state.showComponentToUpdate
        });
    }

    // Function will toggle between showing component to make offer and step page
    makeOfferToggle = () => {
        this.setState({
            showOffer: !this.state.showOffer,
            showComponentToUpdate: !this.state.showComponentToUpdate
        });
    }

    render() { 

        if(this.props.showing.loading){
            return <div>loading...</div>
        }
        
        return (
            <div>
                {this.state.showComponentToUpdate ? <ComponentToUpdate addCriteriaToggle={this.addCriteriaToggle} makeOfferToggle={this.makeOfferToggle} requestShowingToggle={this.requestShowingToggle} updateCriteriaToggle={this.updateCriteriaToggle} 
                buyerFirstName={this.state.buyer_first_name} buyerLastName={this.state.buyer_last_name} 
                showCriteria={this.state.showCriteria} showRequest={this.state.showRequest} showOffer={this.state.showOffer}/> : 
                <div className="componentToShow">
                    <div className="criteria">
                        <h1>Your Dream Home</h1>    
                        {this.props.criteria.map(criteria => {
                            return <p key={criteria.id}>
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
                            })}     
                    </div>
                    <br/>
                    <Divider variant="middle"/>
                    <br/>
                    <div className="showing">
                        <h1>Last Showing Requested</h1>
                        <br/>
                        {this.props.showing.values.length ? <b>{this.props.showing.values[0].address}</b> : <div></div>} 
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    <div className="step3Buttons">
                        {/* If there is no criteria added yet, button will show "Add Criteria". Otherwise, it will say "Update". */}
                        {this.props.criteria.length === 0 ? 
                            <Button style={styles.button} onClick={this.addCriteriaToggle} color="secondary" variant="contained">Add Criteria</Button> :  
                            <Button style={styles.button} onClick={this.updateCriteriaToggle} color="secondary" variant="contained">Update Criteria</Button> 
                            }
                            <br/>
                        <Button style={styles.button} onClick={this.requestShowingToggle} color="secondary" variant="contained">Request a showing</Button>
                        <br/>
                        <Button style={styles.button} onClick={this.makeOfferToggle} color="secondary" variant="contained">Make Offer</Button>
                    </div>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    criteria: state.criteria,
    showing: state.showing,
});

export default connect(mapStateToProps)(Step3Client);