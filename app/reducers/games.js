const initialState = [];

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MATCH_DATA':
      return {
        games: action.games,
        queue: action.queue
      };
    case 'END_SESSION':
      return [];
    default:
      return state;
  }
};

export default gameReducer;
