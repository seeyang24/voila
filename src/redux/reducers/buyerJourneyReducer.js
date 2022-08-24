const userJourney = (state = {loading:true}, action) => {
    switch (action.type) {
        case 'SET_JOURNEY':
          return action.payload;
        default:
          return state;
      }
  };

  export default userJourney;