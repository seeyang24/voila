import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import logo from './voilalogo.png';


const styles = {
    root: {
        flexGrow: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logo: {
        width: '20%',
    }
};

function TopNav(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.root}>
                    <img src={logo} alt='logo' className={classes.logo} onClick={() => console.log('Test')} />
                    <IconButton color="inherit"><AccountCircle /></IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

TopNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNav);