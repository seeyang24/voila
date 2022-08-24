import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import Swal from 'sweetalert2';

class MakeOffer extends Component {

    state = {
        buyer_first_name: this.props.buyerFirstName,
        buyer_last_name: this.props.buyerLastName,
        user_step_id: this.props.userStepId.id,
        name: '',
        address: '',
        price: 0,
        closing_date: '',
        earnest_money: '',
        down_payment: '',
        seller_closing_costs: ''
    }

    makeOffer = () => {
        this.props.dispatch({type: 'POST_OFFER_MADE', payload: this.state});
        this.props.dispatch({type: 'EMAIL_OFFER_MADE', payload: this.state});
        Swal.fire(
            'Success!',
            'Your offer has been submitted to your realtor!',
            'success'
            );
        this.props.makeOfferToggle();
    }

    handleChange = (event, input) => {
        this.setState({
            ...this.state,
            [input]: event.target.value
        });
    }

    cancel = () => {
        this.props.makeOfferToggle();
    }

    render() {
        return( 
            <div className="makeOffer">
                <TextField 
                    fullWidth
                    margin="dense"
                    label="Name"
                    type="text"
                    value={this.state.name} 
                    onChange={(event) => this.handleChange(event, 'name')} 
                />

                <TextField 
                    fullWidth
                    margin="dense"
                    label="Address"
                    placeholder="1000 Voila St. Voila, MN 112219"
                    type="text"
                    value={this.state.address} 
                    onChange={(event) => this.handleChange(event, 'address')} 
                />

                <TextField 
                    fullWidth
                    margin="dense"
                    label="Price"
                    type="Number"
                    value={this.state.price} 
                    onChange={(event) => this.handleChange(event, 'price')} 
                />

                <TextField 
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="dense"
                    label="Closing Date"
                    type="date"
                    value={this.state.closing_date} 
                    onChange={(event) => this.handleChange(event, 'closing_date')} 
                />

                <TextField 
                    fullWidth
                    margin="dense"
                    label="Earnest Money"
                    type="number"
                    value={this.state.earnest_money} 
                    onChange={(event) => this.handleChange(event, 'earnest_money')} 
                />

                <TextField 
                    fullWidth
                    margin="dense"
                    label="Down Payment"
                    type="number"
                    value={this.state.down_payment} 
                    onChange={(event) => this.handleChange(event, 'down_payment')} 
                    placeholder="down payment"
                />

                <TextField 
                    fullWidth
                    margin="dense"
                    label="Seller Closing Costs"
                    type="number"
                    value={this.state.seller_closing_costs} 
                    onChange={(event) => this.handleChange(event, 'seller_closing_costs')} 
                    placeholder="seller closing costs"
                />

                <br/>
                <br/>
                <br/>
                <Button onClick={this.cancel} color="secondary" variant="outlined">Cancel</Button>
                <Button onClick={this.makeOffer} color="secondary" variant="contained">Submit Offer</Button>    
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userStepId: state.userJourney.find(step => {return step.order === 3})
});

export default connect(mapStateToProps)(MakeOffer);    