// initialState constant will keep state in loading until reducer state is replaced with data
const initialState = {
    loading: true,
    values: []
}

// Will contain showings requested from buyer
const showingReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_SHOWING':
            return {
                loading: false,
                values: action.payload
            }
        default:
            return state;
    }
}

export default showingReducer;