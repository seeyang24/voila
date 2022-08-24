import React, { Component } from 'react';
import { connect } from 'react-redux';

import {CheckCircleOutline, PanoramaFishEye} from '@material-ui/icons';
import { ListItemText } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import './step8.css';


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

class Step8Client extends Component {
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
                <h1 className="sectionHeadline">This step is handled by your lender. Voila will update this page as progress is made.</h1>
                <div><h2 className="sectionTitle">Appraisal:</h2>
                    <div className="checkDisplay">
                        {!this.props.appraisal.values[0].requested ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                            <CheckCircleOutline className={classes.icon} color="secondary" /> }
                        Appraisal Requested
                    </div>

                    <div className="checkDisplay">
                        {!this.props.appraisal.values[0].scheduled ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                            <CheckCircleOutline className={classes.icon} color="secondary" /> }
                        Appraisal Scheculed
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

                    <div className="checkDisplay">
                        {!this.props.appraisal.values[0].completed ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                            <CheckCircleOutline className={classes.icon} color="secondary" /> }
                        Appraisal Completed
                    </div>
                </div>

                <div><h2 className="sectionTitle">Title:</h2>
                    <div className="checkDisplay">
                        {!this.props.title.values[0].ordered ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                            <CheckCircleOutline className={classes.icon} color="secondary" /> }
                        Title Ordered
                    </div>

                    <div className="checkDisplay">
                        {this.props.userJourney[7].completed ? <CheckCircleOutline className={classes.icon} color="secondary" /> : 
                                <PanoramaFishEye className={classes.icon} color="secondary"/> }
                        Title Completed
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    appraisal: state.appraisal,
    title: state.title,
    userJourney: state.userJourney,
});

export default withStyles(styles) (connect(mapStateToProps)(Step8Client));