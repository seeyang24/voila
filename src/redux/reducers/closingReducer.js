const closingReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_CLOSING_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default closingReducer;