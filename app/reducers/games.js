const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MATCH_DATA':
      return action.games;
    case 'END_SESSION':
      return [];
    default:
      return state;
  }
};

export default usersReducer;
