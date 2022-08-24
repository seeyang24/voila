// Will contain offers made from buyer

const offerMadeReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_OFFER_MADE':
            return action.payload;
        default:
            return state;
    }
}

export default offerMadeReducer;