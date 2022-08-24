import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem, List, Typography, IconButton, ListItemSecondaryAction, ListItemText, ListItemIcon, Button } from '@material-ui/core';
import OfferAccpetedInputForm from './OfferAccpetedInputForm';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import swal from 'sweetalert2';

const styles = {
    nested: {
        paddingLeft: '20px'
    },
    address: {
        fontSize: '12pt',
    }
}

class Step4Admin extends Component {

    state = {
        showInputForm: false,
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ACCEPTED_OFFER', payload: { userStepId: this.props.userStepId } })
    }

    toggleShowInput = () => {
        this.setState({showInputForm: !this.state.showInputForm});
    }

    deleteAcceptedOffer = (id) => {
        swal.fire({
            title: "Are you sure you want to delete this?",
            text: "This action cannot be undone",
            icon: "warning",
            confirmButtonColor: '#af1419',
            showCancelButton: true,
        })
            .then((result) => {
                if (result.value) {
                    this.props.dispatch({ type: 'DELETE_ACCEPTED_OFFER', payload: { userStepId: this.props.userStepId, id: id}})
                    setTimeout(() => {
                        swal.fire({
                            title: "Deleted",
                            text: "This accepted offer has been deleted.",
                            confirmButtonColor: '#af1419',
                            icon: "success",
                        });
                    }, 100);

                }
        });
    }
    render() {

        return (
            <div>
                {this.props.offerAccepted.loading ?
                    <p>...loading...</p>
                    :
                    <>
                        {this.state.showInputForm ?
                            <OfferAccpetedInputForm userStepId={this.props.userStepId} showInputForm={this.state.showInputForm} toggleShowInput={this.toggleShowInput}/>
                        :
                            <>
                                <h1>{this.props.buyerName}'s accepted offer details: </h1>
                                {this.props.offerAccepted.map(offer => 
                                    <List key={offer.id}>
                                        <ListItem>
                                            <ListItemText primary={<Typography style={styles.address}>{offer.address}</Typography>}/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" onClick={() => this.deleteAcceptedOffer(offer.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <List disablePadding style={styles.nested} dense>
                                            <ListItem>MLS: {offer.MLS_number}</ListItem>
                                            <ListItem>Price: ${offer.price}</ListItem>
                                            <ListItem>Down Payment: ${offer.downPayment}</ListItem>
                                            <ListItem>Earnest Money: {offer.ernestMoney || 'None'}</ListItem>
                                        </List>
                                    </List>
                                )}
                                <Button variant="outlined" onClick={() => this.toggleShowInput()}>Add Accepted Offer</Button>
                            </>
                        }
                    </>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    offerAccepted: state.offerAccepted
});

export default connect(mapStateToProps)(Step4Admin);