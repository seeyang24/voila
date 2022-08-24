const adminTypeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_TYPE':
            return action.payload;
        default:
            return state;
    }
};

export default adminTypeReducer;