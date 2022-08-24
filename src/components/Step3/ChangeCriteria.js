import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import Swal from 'sweetalert2';

class ChangeCriteria extends Component {

    state = {
        buyer_first_name: this.props.buyerFirstName,
        buyer_last_name: this.props.buyerLastName,
        user_step_id: this.props.userStepId.id,
        bedroom_count: '',
        bathroom_count: '',
        square_feet: '',
        location: '',
        notes: ''
    }

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_JOURNEY'});
    } 

    addCriteria = () => {
        this.props.dispatch({type: 'POST_CRITERIA', payload: this.state});
        this.props.dispatch({type: 'EMAIL_CRITERIA', payload: this.state});
        Swal.fire(
            'Success!',
            'You have added new home criteria!',
            'success'
            );
        this.props.addCriteriaToggle();
    }

    updateCriteria = () => {
        this.props.dispatch({type: 'UPDATE_CRITERIA', payload: this.state});
        this.props.dispatch({type: 'EMAIL_CRITERIA', payload: this.state});
        Swal.fire(
            'Success!',
            'You have updated your home criteria!',
            'success'
            );
        this.props.updateCriteriaToggle();
    }

    handleChange = (event, input) => {
        this.setState({
            ...this.state,
            [input]: event.target.value
        });
    }

    cancel = () => {
        this.props.addCriteriaToggle();
        this.props.updateCriteriaToggle();
    }

    render() {
        return( 
            <div className="criteriaChange">
                <TextField 
                    fullWidth
                    margin="dense"
                    label="Bedroom Count"
                    type="number"
                    value={this.state.bedroom_count} 
                    onChange={(event) => this.handleChange(event, 'bedroom_count')} 
                />

                <TextField 
                    fullWidth
                    margin="dense"
                    label="Bathroom Count"
                    type="number"
                    value={this.state.bathroom_count} 
                    onChange={(event) => this.handleChange(event, 'bathroom_count')} 
                />

                <TextField 
                    fullWidth
                    margin="dense"
                    label="Square Feet"
                    placeholder="e.g. 15,000"
                    type="number"
                    value={this.state.square_feet} 
                    onChange={(event) => this.handleChange(event, 'square_feet')} 
                />

                <TextField 
                    fullWidth
                    margin="dense"
                    label="Location/Zip Code"
                    placeholder='e.g. "maplewood", 55117'
                    type="text"
                    value={this.state.location} 
                    onChange={(event) => this.handleChange(event, 'location')} 
                />

                <TextField 
                    multiline
                    fullWidth
                    margin="dense"
                    label="Any notes for your realtor?"
                    placeholder='"I would like to live by a restaurant that serves jucy lucy burgers."'
                    type="text"
                    value={this.state.notes} 
                    onChange={(event) => this.handleChange(event, 'notes')} 
                />

                <br/>
                <br/>
                <br/>
                <Button onClick={this.cancel} color="secondary" variant="outlined">Cancel</Button>
                {this.props.criteria.length === 0 ? <Button onClick={this.addCriteria} color="secondary" variant="contained">Add Criteria</Button> :    
                <Button onClick={this.updateCriteria} color="secondary" variant="contained">Update Criteria</Button>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userStepId: state.userJourney.find(step => {return step.order === 3}),
    criteria: state.criteria
});

export default connect(mapStateToProps)(ChangeCriteria);    