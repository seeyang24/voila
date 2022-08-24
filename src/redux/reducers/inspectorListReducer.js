const initialState = {
    loading: true,
    values: []
  }
  //TODO reset initial state and returned states when we have the team to re-work client side
  
  const inspectorList = (state = initialState, action) => {
      switch (action.type) {
        case 'SET_INSPECTORS':
          return {
              loading: false,
              values: action.payload
          }
        default:
          return state;
      }
    };
  
    export default inspectorList;