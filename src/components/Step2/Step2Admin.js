import React, { Component } from 'react';
import { connect } from 'react-redux';

class Step2Admin extends Component {

    render() {
        return (
            <div>
                <p>Once {this.props.buyerName} has been pre-approved, add the pre-approval documents to their Voila Vault dropbox.</p> 
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(Step2Admin);