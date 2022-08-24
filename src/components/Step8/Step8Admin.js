import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField ,Button, ListItemText } from '@material-ui/core';
import {CheckCircleOutline, PanoramaFishEye} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';


import Moment from 'react-moment';

const styles = theme => ({
    fab: {
      margin: theme.spacing.unit,
    },
    root: {
        color: theme.palette.text.primary,
    },
      icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    select:{
        minWidth: 200
    }
  });
class Step8Admin extends Component {
    state = {
        open: false,
        user_step_id: this.props.userStepId,
        date: '',
    };

    toggleTrue = (type)=>{
        switch(type){
            case 'request':
                this.props.dispatch({type: 'UPDATE_APPRAISAL_REQUESTED', 
                    payload: {user_step_id: this.props.userStepId, 
                            value: !this.props.appraisal.values[0].requested}});
                break;
            case 'schedule':
                this.props.dispatch({type: 'UPDATE_APPRAISAL_SCHEDULED', 
                    payload: {user_step_id: this.props.userStepId, 
                            value: !this.props.appraisal.values[0].scheduled}});
                break;
            case 'complete':
                this.props.dispatch({type: 'UPDATE_APPRAISAL_COMPLETED', 
                    payload: {user_step_id: this.props.userStepId, 
                            value: !this.props.appraisal.values[0].completed}});
                break;
            case 'titleOrdered':
                this.props.dispatch({type: 'UPDATE_TITLE_ORDERED', 
                    payload: {user_step_id: this.props.userStepId, 
                            value: !this.props.title.values[0].ordered}});
                break;
            case 'titleCompleted':
                this.props.dispatch({type: 'UPDATE_TITLE_COMPLETED', 
                    payload: {user_step_id: this.props.userStepId, 
                            value: !this.props.title.values[0].completed}});
                break;
            default:
                console.log('error changing the status of:', type)
        }
    }

    handleClickOpen = ()=>{
        this.setState({ open: true });
    }

    handleClose = ()=>{ 
        this.setState({open: false });
    }

    handleSubmit = ()=>{
        this.props.dispatch({type: 'UPDATE_APPRAISAL_DATE', payload: this.state});
        this.handleClose();
    }

    handleChange = (event)=>{
        this.setState({ date: event.target.value})
    }

    componentDidMount = ()=>{
        this.props.dispatch({type: 'GET_APPRAISAL', payload:this.props.userStepId});
        this.props.dispatch({type: 'GET_TITLE', payload:this.props.userStepId});
    }

    render() {
        const { classes } = this.props;

        if(this.props.appraisal.loading || this.props.title.loading){
            return <div>...loading...</div>
        }

        return (
            <div className="pageDiv">
                <h1 className="sectionHeadline">{`Mark off each step as the lender completes it so that ${this.props.buyerName} can see the progresss.`}</h1>
                <div className="content">
                <div><h2 className="sectionTitle">Appraisal:</h2>
                    <div role="button" onClick={()=>{this.toggleTrue('request')}} className="checkDisplay">
                        {!this.props.appraisal.values[0].requested ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                            <CheckCircleOutline className={classes.icon} color="secondary" /> }
                        Appraisal Requested
                    </div>

                    <div role="button" onClick={()=>{this.toggleTrue('schedule')}} className="checkDisplay">
                        {!this.props.appraisal.values[0].scheduled ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                            <CheckCircleOutline className={classes.icon} color="secondary" /> }
                        Appraisal Scheduled
                    </div>

                    <div className="buyerSelection">
                    { !this.props.appraisal.values[0].scheduleDate ? <div></div> :
                        // 
                        <ListItemText
                            primary={<>Date: <Moment format="MM/DD/YYYY">
                            {this.props.appraisal.values[0].scheduleDate}
                            </Moment></>}
                        /> 
                        }
                    </div>

                    <div role="button" onClick={()=>{this.toggleTrue('complete')}} className="checkDisplay">
                        {!this.props.appraisal.values[0].completed ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                            <CheckCircleOutline className={classes.icon} color="secondary" /> }
                        Appraisal Completed</div>
                
                <h2 className="sectionTitle">Title:</h2>
                    <div role="button" onClick={()=>{this.toggleTrue('titleOrdered')}} className="checkDisplay">
                        {!this.props.title.values[0].ordered ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                            <CheckCircleOutline className={classes.icon} color="secondary" /> }
                        Title Ordered
                    </div>

                    <div role="button" onClick={()=>{this.toggleTrue('titleCompleted')}} className="checkDisplay">
                        {this.props.title.values[0].completed ? <CheckCircleOutline className={classes.icon} color="secondary" /> : 
                            <PanoramaFishEye className={classes.icon} color="secondary"/> }
                        Title Completed
                    </div>
                </div>
                </div>

                <Button variant="outlined" onClick={this.handleClickOpen}>
                    Add Appraisal Date
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="add-appraisal-date"
                    >
                    <DialogContent>
                        <DialogContentText>
                        Add the scheduled appraisal date.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            value={this.state.date}
                            onChange={(event)=>{this.handleChange(event)}}
                            margin="dense"
                            id="name"
                            label="Appraisal Date"
                            type="date"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                        Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    appraisal: state.appraisal,
    title: state.title,
    userJourney: state.userJourney,
});

export default withStyles(styles) (connect(mapStateToProps)(Step8Admin));