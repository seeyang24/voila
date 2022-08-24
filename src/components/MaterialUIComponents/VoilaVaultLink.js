import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton, Tooltip } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';

const styles = {
    icon: {
        marginLeft: '4px'
    }
}

class VoilaVaultLink extends Component {


    render() {
        return (
            <div>
                <Tooltip title="Voila Vault" aria-label="voila vault">
                    <IconButton style={styles.icon} edge="start" onClick={() => window.open(`https://${this.props.link}`, "_blank")}>
                        <DescriptionIcon />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(VoilaVaultLink);