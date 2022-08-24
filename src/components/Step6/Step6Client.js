import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material UI
import Fab from '@material-ui/core/Fab';
import {Add as AddIcon, CheckCircleOutline, PanoramaFishEye} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Select, FormControl, InputLabel, MenuItem} from '@material-ui/core';
import {ListItem, ListItemText} from '@material-ui/core';
import AddInspection from './AddInspection';
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

class Step6Client extends Component {
    state = {
        inspectionId: '',
        open: false,
    }

    handleChange = (propertyName, event)=>{
        this.setState({
            [propertyName]: event.target.value
          })
    }

    handleAdd = () => {
        this.setState({
            open: true
        })
    }
    handleClose=()=>{
        this.setState({
            open: false,
        })
    }

    displaySingleInspector = ()=>{
        //display the vendor's contact information when specific vendor has been clicked
        const inspectorToDisplay = this.props.inspectorList.values.find((inspector)=> inspector.id === Number(this.state.inspectionId));
        return <ListItemText
            primary={inspectorToDisplay.companyName}
            secondary={
                <>
                Name: {inspectorToDisplay.firstName} {inspectorToDisplay.lastName}
                <br></br>
                Phone: {inspectorToDisplay.phoneNumber}
                <br></br>
                Email: {inspectorToDisplay.email}
                <br></br>
                Website: {inspectorToDisplay.website}
                </>
            }
        />
    }

    componentDidMount = ()=>{
        this.props.dispatch({type: 'GET_INSPECTORS'});
        this.props.dispatch({type: 'GET_USER_INSPECTION', payload:{user_step_id:this.props.userStepId}})
    }
    render() {
        const { classes } = this.props;
        //if redux store vendorList has not yet loaded the date
        //the page will display ...loading... rather than empty data
        if(this.props.inspectorList.loading){
            return <div>...loading...</div>
        }
        //loop through inspection vendors from redux store (inspectorList)
        //to display each individual vendor name in select
        const inspectors = this.props.inspectorList.values.map((inspector)=>{
            return <MenuItem 
                        key={inspector.id}
                        value={inspector.id}>{inspector.companyName}</MenuItem>
        })
       

        return (
            <div className="pageDiv">
    
                <h1 className="sectionHeadline">Use one of our inspection partners or schedule your own</h1>
                <div className="content">
                <div className="inspectionPartners checkDisplay">
                    <FormControl className={classes.select}>
                        <InputLabel id="selectInspectors">Inspection Partners</InputLabel>
                        <Select
                            labelId="selectInspectors"
                            onChange={(event) => {this.handleChange('inspectionId', event)}}
                            value={this.state.inspectionId}
                            >
                            <MenuItem value={''}>--View an Inspection Partner--</MenuItem>
                                {inspectors}
                        </Select>
                    </FormControl>
                
                    {/* if an inspector has been selected from the list, show the contact info otherwise show nothing */}
                    {this.state.inspectionId ? <div>{this.displaySingleInspector()}</div> : <div></div>}
                </div>

                <div className="inspectionDetails">
                    <div className="checkDisplay">Add Your Inspection Details 
                        <div>
                            <Fab onClick={this.handleAdd} color="secondary" aria-label="Add" className={classes.fab} size="small">
                                <AddIcon />
                            </Fab> 
                        </div>   
                    </div>

                    <div>
                        <div className="checkDisplay">
                            {!this.props.selectedInspector.values.length ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                                <CheckCircleOutline className={classes.icon} color="secondary" /> }
                            
                            Inspection Scheduled
                        </div>

                        <div className="buyerSelection">
                            {/* if no inspection has been entered in by user, this bar will show un-checked. If user enters data, it will show checked */}
                            { !this.props.selectedInspector.values.length ? <div>Not Yet</div> :
                                <ListItemText
                                primary={<>Inspector: {this.props.selectedInspector.values[0].name}</>}
                                secondary={<>Date: <Moment format="MM/DD/YYYY">
                                {this.props.selectedInspector.values[0].inspectionDate}
                                </Moment></>}/>
                            }
                        </div>
                    </div>
                    <div className="checkDisplay">
                        {/* this will show checked when the overall section has been completed */}
                    {this.props.userJourney[5].completed ? <CheckCircleOutline className={classes.icon} color="secondary" /> : 
                            <PanoramaFishEye className={classes.icon} color="secondary"/> }
                        Inspection Negotiated
                    </div>
                    <ListItemText
                            primary="To be marked complete by Voila"
                            className="note"
                        />
                </div>
                {this.state.open ? <AddInspection open={this.state.open} userStepId ={this.props.userStepId} handleClose={this.handleClose} /> : <div></div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    inspectorList: state.inspectorList,
    selectedInspector: state.selectedInspector,
    userJourney: state.userJourney,
});

export default withStyles(styles) (connect(mapStateToProps)(Step6Client));