const vendorTypeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VENDOR_TYPE':
            return action.payload;
        default:
            return state;
    }
};

export default vendorTypeReducer;