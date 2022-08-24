import React, {Component} from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button,
        InputLabel, MenuItem, FormControl, FormControlLabel, Select, Switch } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import Swal from 'sweetalert2';
  
  const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '1vh',
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
  });

  // stop tab key from closing the dialog box
  const stopPropagationForTab = (event) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
    if (event.key == 'a') {
        event.stopPropagation();
    }
    if (event.key === 'A') {
        event.stopPropagation();
    }
  };

class ClientDialog extends Component {

    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        dropboxUrl: '',
        agent_id: '',
        role_id: 3,
        journey: false,
    };

    componentDidMount() {
        this.getAgents();
    }

    // get the list of agents to assign to Buyer
    getAgents = () => {
        this.props.dispatch({
            type: 'GET_AGENT',
        })
    }

    // select from a list of agents
    changeAgent = event => {
        this.setState({ agent_id: event.target.value });
    };

    // switch on Buyer Journey, true or false
    handleSwitch = journey => event => {
        this.setState({ [journey]: event.target.checked });
    };

    // POST data to create new user
    addClient = () => {
        this.props.dispatch({
            type: 'REGISTER',
            payload: this.state
        })
        this.setState({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            dropboxUrl: '',
            agent_id: '',
            role_id: 3,
            journey: false,
        });
        Swal.fire(
            'Success!',
            'Client has been added!',
            'success'
          )
        this.props.handleClose();
    } 

    // Change the states with each input made
    handleChange= propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
            journey: event.target.checked
        });
     }
      
    render() {

        const { classes } = this.props;

        // map through the agents and list them into menu items to select
        const agentList = this.props.agent.map( (agent) => {
            return (
                <MenuItem key={agent.id} value={agent.id}>{agent.firstName} {agent.lastName}</MenuItem>
            )
        })
        
        return (
            <div>
                <Dialog
                    open={this.props.state.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                    onKeyDown={stopPropagationForTab}
                >
                    <DialogContent dividers>
                        <DialogTitle className={classes.dialogTitle}>Add New Client </DialogTitle>
                    </DialogContent>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        />
                        <TextField
                        autoFocus
                        label="First Name"
                        type="text"
                        fullWidth
                        className={classes.textField}
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        label="DropBox Url"
                        type="text"
                        fullWidth
                        value={this.state.dropboxUrl}
                        onChange={this.handleChange('dropboxUrl')}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="agent">Select Agent</InputLabel>
                            <Select
                                value={this.state.agent_id}
                                onChange={this.handleChange('agent_id')}
                                inputProps={{
                                name: 'agent_id',
                                }}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {agentList}
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Switch
                                checked={this.state.journey}
                                onChange={this.handleChange('journey')}
                                value={this.state.journey}
                                />
                            }
                            label="Start Buyer Journey"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={this.props.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={() => this.addClient()} color="secondary">
                            <SaveIcon className={classes.leftIcon} />
                            Add Client
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    agent: state.agent
});

export default withStyles(styles) (connect(mapStateToProps) (ClientDialog));