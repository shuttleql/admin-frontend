const initialState = {
  started: false,
  startTime: null
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SESSION_STARTED':
      const startedSession = action.session;

      return {
        ...state,
        started: startedSession.isActive,
        startTime: new Date(startedSession.createdAt)
      };
    case 'SESSION_ENDED':
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
