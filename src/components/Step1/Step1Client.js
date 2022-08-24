import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


const styles = {
    icon: {
        color: "#757575"
    }
}

class Step1Client extends Component {

    render() {
        return (
            <div>
                <h1>Welcome, {this.props.user.firstName}!</h1>
                <Typography paragraph>
                    Here, you can follow your home-buying journey!
                </Typography>
                <Typography paragraph>
                    The information icon < InfoOutlinedIcon style={styles.icon}/> in the top right corner of each step will provide additional details about that step.
                </Typography>
                <Typography paragraph>
                    The document icon <DescriptionIcon style={styles.icon}/> will be displayed in the top left corner on steps that require official documents. This will bring you to the Voila Vault, a dropbox containing all of your important documents.
                </Typography>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    user: state.user
});

export default connect(mapStateToProps)(Step1Client);