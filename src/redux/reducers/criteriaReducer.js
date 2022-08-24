// Will contain house criteria for specific buyer

const criteriaReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_CRITERIA':
            return action.payload
        default:
            return state;
    }
};

export default criteriaReducer;