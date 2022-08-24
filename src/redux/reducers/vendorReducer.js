const initialState = {
  loading: true,
  values: []
}

const vendorList = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_VENDOR':
        return {
          loading: false,
          values: action.payload,
        }
      default:
        return state;
    }
  };

  export default vendorList;