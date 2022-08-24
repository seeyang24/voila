import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, FormControl, Button } from '@material-ui/core';

class Step4Admin extends Component {

    state = {
        acceptedOffer: {
            userStepId: this.props.userStepId,
            address: '',
            mls_number: '',
            price: '',
            earnestMoney: '',
            downpayment: ''
        }
    }

    handleChange = (event, keyname) => {
        this.setState({
            acceptedOffer: { ...this.state.acceptedOffer, [keyname]: event.target.value }
        })
    }

    handleSubmit = () => {
        this.props.dispatch({ type: 'ADD_ACCEPTED_OFFER', payload: this.state.acceptedOffer })
        setTimeout(() => {
            this.props.toggleShowInput();
        }, 500);
    }


    render() {
        return (
            <div>
                <p>Please enter information on client's accepted offer: </p>
                <div>
                    <FormControl fullWidth>
                        <TextField
                            label="Address"
                            placeholder="e.g. 123 Fourth St., Minneapolis, MN 55410"
                            value={this.state.address}
                            onChange={(event) => { this.handleChange(event, 'address') }}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            label="MLS Number"
                            placeholder="MLS Number"
                            onChange={(event) => { this.handleChange(event, 'mls_number') }}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            label="Price"
                            placeholder="Total Amount Offered"
                            onChange={(event) => { this.handleChange(event, 'price') }}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            label="Earnest Money"
                            placeholder="Earnest Money Amount"
                            onChange={(event) => { this.handleChange(event, 'earnestMoney') }}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            label="Down Payment"
                            placeholder="Down Payment Amount"
                            onChange={(event) => { this.handleChange(event, 'downpayment') }}
                            margin="dense"
                            variant="outlined"
                        />
                    </FormControl>
                    <Button
                        variant="outlined"
                        onClick={() => this.props.toggleShowInput()}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => this.handleSubmit()}
                        color="primary"
                    >
                        Save
                    </Button>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(Step4Admin);