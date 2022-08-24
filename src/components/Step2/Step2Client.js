import React, { Component } from 'react';
import { connect } from 'react-redux';

class Step2Client extends Component {

    render() {
        return (
            <div>
                <p>You'll need to be pre-approved for a mortgage before you can continue. If you've already been pre-approved, please contact your agent with your pre-approval documents.</p> 
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(Step2Client);