import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';

class Step1Admin extends Component {

    render() {
        return (
            <div>
                {/* <VoilaVaultLink/> */}
                <Typography paragraph>{this.props.buyerName} has started the home-buying process with you.</Typography>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(Step1Admin);