const initialState = {
    loading: true,
    values: []
}

const selectedInsuranceReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_USER_INSURANCE':
            return {
                loading: false,
                values: action.payload
            }
        default:
            return state;
    }
}

export default selectedInsuranceReducer;