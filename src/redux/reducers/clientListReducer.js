const initialState = {
  loading: true,
  values: []
}

const clientList = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CLIENT':
        return {
          loading: false,
          values: action.payload
        }
      default:
        return state;
    }
  };

  export default clientList;