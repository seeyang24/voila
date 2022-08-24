const walkthroughReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_FINAL_WALKTHROUGH':
            return action.payload;
        default:
            return state;
    }
}

export default walkthroughReducer;