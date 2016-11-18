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
    case 'FETCHED_CURRENT_SESSION':
      const session = action.session;

      return {
        ...state,
        started: session.isActive,
        startTime: new Date(session.createdAt)
      }
    default:
      return state;
  }
};

export default sessionReducer;
