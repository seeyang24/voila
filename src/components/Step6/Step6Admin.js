import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';


//Material UI
import {CheckCircleOutline, PanoramaFishEye} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Select, FormControl, InputLabel, MenuItem} from '@material-ui/core';
import {ListItemText} from '@material-ui/core';


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
class Step6Admin extends Component {

    state = {
        inspectionId: '',
        open: false,
    }

    componentDidMount = ()=>{
        this.props.dispatch({type: 'GET_INSPECTORS'});
        this.props.dispatch({type: 'GET_USER_INSPECTION', payload:{user_step_id:this.props.userStepId}})
    }

    handleChange = (propertyName, event)=>{
        this.setState({
            [propertyName]: event.target.value
          })
    }

    displaySingleInspector = ()=>{
        //display the vendor's contact information
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


    render() {

        const { classes } = this.props;
        // if redux does not have data in it yet, display loading
        if(this.props.inspectorList.loading){
            return <div>...loading...</div>
        }
        //when redux data has arrived, map through inspectors returned from database
        const inspectors = this.props.inspectorList.values.map((inspector)=>{
            return <MenuItem 
                        key={inspector.id}
                        value={inspector.id}>{inspector.companyName}</MenuItem>
            })

        return (
            <div className="pageDiv">
                
                <h1 className="sectionHeadline">Inspection scheduled will be marked complete when the buyer adds inspection details</h1>
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

                <div>
                    <div className="checkDisplay">
                        {!this.props.selectedInspector.values.length ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                            <CheckCircleOutline className={classes.icon} color="secondary" /> }
                        
                        Inspection Scheduled
                    </div>
                    <div className="buyerSelection">
                        { !this.props.selectedInspector.values.length ? <div>not yet</div> :
                        //selected vendors are returned from DB with most recent entry at first position of array
                        <ListItemText
                            primary={<>Inspector: {this.props.selectedInspector.values[0].name}</>}
                            secondary={<>Date: <Moment format="MM/DD/YYYY">
                            {this.props.selectedInspector.values[0].inspectionDate}
                            </Moment></>}
                        />}
                    </div>
                </div>

                <div className="checkDisplay">
                    {this.props.userJourney[5].completed ? <CheckCircleOutline className={classes.icon} color="secondary" /> : 
                            <PanoramaFishEye className={classes.icon} color="secondary"/> }
                        Inspection Negotiated    
                </div>
                <ListItemText
                    primary="Note: Inspection Negotiated will be automatically checked when this journey is marked complete "
                    className="note"
                />
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

export default withStyles(styles) (connect(mapStateToProps)(Step6Admin));