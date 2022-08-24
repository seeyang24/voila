import React from 'react';
import homePlaceholder from './HomePlaceholder.png';
import { Typography} from '@material-ui/core';

const styles = {
    root: {
        margin: 'auto',
    },
    img: {
        width: '45%'
    },
}

export default function OfferAcceptedDisplay(props) {
    return(
        <div style={styles.root}>
            <h1>Congrats! Your offer of {props.offer.price} with a downpayment of {props.offer.downPayment} was accepted!</h1>
            <br/>
            <img style= {styles.img} src={homePlaceholder} alt='home icon' />
            <br/>
            <Typography variant="body1">{props.offer.address}</Typography>
            <br/>
            <Typography variant="subtitle2">NOTE: Please check back frequently as there will be serveral time-sensitive steps to follow.</Typography>
        </div>
    )
}

