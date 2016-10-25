const initialState = {
  started: false,
  startTime: null
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_SESSION':
      return {
        ...state,
        started: true,
        startTime: new Date()
      };
    case 'END_SESSION':
      return {
        ...state,
        started: false,
        startTime: null
      };
    default:
      return state;
  }
};

export default sessionReducer;
