import React from 'react';
import ChangeCriteria from './ChangeCriteria';
import RequestShowing from './RequestShowing';
import MakeOffer from './MakeOffer';
 
// This component will change componentToShow depending on which state is toggled in Step3Client component
const ComponentToUpdate = (props) => {

    let componentToShow;

    if(props.showRequest){
        componentToShow = <RequestShowing requestShowingToggle={props.requestShowingToggle} buyerFirstName={props.buyerFirstName} buyerLastName={props.buyerLastName}/>
    } else if (props.showCriteria){
        componentToShow = <ChangeCriteria addCriteriaToggle={props.addCriteriaToggle} updateCriteriaToggle={props.updateCriteriaToggle} buyerFirstName={props.buyerFirstName} buyerLastName={props.buyerLastName}/>
    } else if (props.showOffer){
        componentToShow = <MakeOffer makeOfferToggle={props.makeOfferToggle} buyerFirstName={props.buyerFirstName} buyerLastName={props.buyerLastName}/>
    }
    return componentToShow;
}

export default ComponentToUpdate;