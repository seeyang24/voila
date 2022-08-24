import React, { Component } from 'react';
import { connect } from 'react-redux';


import {CheckCircleOutline, PanoramaFishEye} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Select, FormControl, InputLabel, MenuItem} from '@material-ui/core';
import {ListItem, ListItemText} from '@material-ui/core';


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

class Step7Admin extends Component {

    state = {
        insuranceId: '',
        open: false,
    }

    handleChange = (propertyName, event)=>{
        this.setState({
            [propertyName]: event.target.value
          })
    }

    displaySingleInsurance = ()=>{
        //display the vendor's contact information
        const insuranceToDisplay = this.props.insuranceList.values.find((insurance)=> insurance.id === Number(this.state.insuranceId));
        return <ListItemText
                primary={insuranceToDisplay.companyName}
                secondary={
                    <>
                    Name: {insuranceToDisplay.firstName} {insuranceToDisplay.lastName}
                    <br></br>
                    Phone: {insuranceToDisplay.phoneNumber}
                    <br></br>
                    Email: {insuranceToDisplay.email}
                    <br></br>
                    Website: {insuranceToDisplay.website}
                    </>
        }
    />
    }

    componentDidMount = ()=>{
        this.props.dispatch({type: 'GET_INSURANCE'}); //call to vendorSaga
        this.props.dispatch({type: 'GET_USER_INSURANCE', payload:{user_step_id:this.props.userStepId}})
    }

    render() {
        const { classes } = this.props;
        //if vendorList has not yet loaded, display page loading
        if(this.props.insuranceList.loading){
            return <div>...loading...</div>
        }
        //loop through inspection vendors from redux store (vendorList)
        //to display each individual vendor name in select
        const insurance = this.props.insuranceList.values.map((insurance)=>{
            return <MenuItem 
                        key={insurance.id}
                        value={insurance.id}>{insurance.companyName}</MenuItem>
        })

        return (
            <div className="pageDiv">
                <h1 className="sectionHeadline">Insurance Acquired will be entered by the buyer</h1>
                <div className="content">
                <div className="insurancePartners">
                    <FormControl className={classes.select}>
                        <InputLabel id="selectInsurance">Insurance Partners</InputLabel>
                        <Select
                            labelId="selectInsurance"
                            onChange={(event) => {this.handleChange('insuranceId', event)}}
                            value={this.state.insuranceId}
                            >
                            <MenuItem value={''}>--View an Insurance Partner--</MenuItem>
                                {insurance}
                        </Select>
                    </FormControl>
                
                    {/* if an inspector has been selected from the list, show the contact info otherwise show nothing */}
                    {this.state.insuranceId ? <div>{this.displaySingleInsurance()}</div> : <div></div>}
                </div>

                <div>
                    <div className="checkDisplay">
                        {!this.props.selectedInsurance.values.length ? <PanoramaFishEye className={classes.icon} color="secondary"/> : 
                                <CheckCircleOutline className={classes.icon} color="secondary" /> }
                            
                        Insurance Aquired
                    </div>
                    <div className="buyerSelection">
                    { !this.props.selectedInsurance.values.length ? <div>Not Yet</div> :
                        //selscted vendors are returned from DB with most recently added in first position of array
                        <ListItemText
                            primary={<>Agent: {this.props.selectedInsurance.values[0].name}</>}
                            secondary={<>Start Date: <Moment format="MM/DD/YYYY">
                            {this.props.selectedInsurance.values[0].insuranceStartDate}
                            </Moment></>}
                        />}
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    insuranceList: state.insuranceList,
    selectedInsurance: state.selectedInsurance,
    userJourney: state.userJourney,
});

export default withStyles(styles) (connect(mapStateToProps)(Step7Admin));