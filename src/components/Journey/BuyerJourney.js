import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepCard from '../MaterialUIComponents/StepCard';

class BuyerJourney extends Component {
    
    state = {
        header: [],
        step: []
    }

    componentDidMount(){
        if(this.isAdmin()) {
            this.props.dispatch({ type: 'GET_JOURNEY_FOR_USER', user_id: this.props.match.params.id })
        } else {
            this.props.dispatch({ type: 'GET_JOURNEY' })
        }
    }

    isAdmin = () => {
        if(this.props.user.role_id === '3'){
            return false;
        } else {
            return true;
        }
    }

    getHeaders = () => {
        let header = this.props.userJourney.map(step => [...step.name])
        return header;
    }

    showVault = (stepNum) => {
        const stepsToShowVault = [1, 2, 5, 6, 10]
        if(stepsToShowVault.includes(stepNum)){
            return true;
        } else {
            return false;
        }
    }

    
    render(){
        return (
                <div>
                    
                    {this.props.userJourney.loading === true ? <p>...loading...</p> 
                    :
                    <>
                        {this.props.userJourney.map(step => <div key={step.id}><StepCard step={step} showVault={this.showVault}/></div>)}
                    </>
                    }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userJourney: state.userJourney,
    user: state.user,
});

export default connect(mapStateToProps)(BuyerJourney);