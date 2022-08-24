import React, { Component } from 'react';
import { connect } from 'react-redux';

class Step10Admin extends Component {

    render() {
        return (
            <div>
           Mark this step complete when {this.props.buyerName} has attached the  Closure Disclosure form in the voila vault.
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(Step10Admin);