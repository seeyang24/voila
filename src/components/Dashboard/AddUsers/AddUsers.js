import React, {Component} from 'react';
import { connect } from 'react-redux';

// Material UI
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ClientDialog from './ClientDialog';
import AddAdmin from './AddAdmin';
import AddVendor from './AddVendor';

const styles = theme => ({
    fab: {
      position: 'fixed',
      margin: theme.spacing(2),
      bottom: theme.spacing(2),
      right: theme.spacing(1),
    },
  });

class AddUsers extends Component {

  state = {
    open: false,
    anchorEl: null,
    addClientDialog: false,
    addAdminDialog: false,
    addVendorDialog: false
}

  // opens the 
  handleAdd = (event) => {
  this.setState({ open: true, anchorEl: event.currentTarget });
  };

  // Closes the Add Button, addClientDialog, addAdminDialog, addVendorDialog
  handleClose = () => {
      this.setState({ anchorEl: null, addClientDialog: false, addAdminDialog: false, addVendorDialog: false});
  };

  // Sets the dialog for adding a client to true and displaying on the screen to add new client
  handleAddClient = () => {
    this.setState({
      addClientDialog: true,
    });
  }

  // Sets the dialog for adding an admin to true and displaying on the screen to add new admin
  handleAddAdmin = () => {
    this.setState({
      addAdminDialog: true,
    });
  }

  // Sets the dialog for adding a vendor to true and displaying on the screen to add new vendor
  handleAddVendor = () => {
    this.setState({
      addVendorDialog: true,
    });
  }

    render() {

        const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div>
              <Fab onClick={this.handleAdd} color="primary" aria-label="Add" color="secondary" className={classes.fab} size="large"
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true" 
              >
                  <AddIcon />
              </Fab>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleAddClient}>Add Client</MenuItem>
                {this.state.addClientDialog ? <ClientDialog state={this.state} handleAdd={this.handleAdd} handleClose={this.handleClose}/> : null}
                <Divider />
                <MenuItem onClick={this.handleAddAdmin}>Add Admin</MenuItem>
                {this.state.addAdminDialog ? <AddAdmin state={this.state} handleAdd={this.handleAdd} handleClose={this.handleClose}/> : null}
                <Divider />
                <MenuItem onClick={this.handleAddVendor}>Add Vendor</MenuItem>
                {this.state.addVendorDialog ? <AddVendor state={this.state} handleAdd={this.handleAdd} handleClose={this.handleClose}/> : null}
              </Menu>
            </div>
        )
    }
}

AddUsers.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles) (AddUsers);