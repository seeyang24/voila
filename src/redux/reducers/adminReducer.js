const initialState = {
  loading: true,
  values: []
}

const adminList = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ADMIN':
        return {
          loading: false,
          values: action.payload,
        }
      default:
        return state;
    }
  };

  export default adminList;