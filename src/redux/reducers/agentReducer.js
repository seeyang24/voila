const agentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_AGENT':
            return action.payload;
        default:
            return state;
    }
};

export default agentReducer;