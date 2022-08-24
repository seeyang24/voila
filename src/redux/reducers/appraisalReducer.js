const initialState = {
    loading: true,
    values: []
}

const appraisalReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_APPRAISAL':
            return {
                loading: false,
                values: action.payload
            }
        default:
            return state;
    }
}

export default appraisalReducer;