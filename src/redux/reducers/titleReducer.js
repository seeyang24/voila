const initialState = {
    loading: true,
    values: []
}

const titleReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_TITLE':
            return {
                loading: false,
                values: action.payload
            }
        default:
            return state;
    }
}

export default titleReducer;