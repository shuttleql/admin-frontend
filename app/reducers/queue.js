const initialState = [];

const queueReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MATCH_DATA':
      return action.queue;
    case 'END_SESSION':
      return [];
    default:
      return state;
  }
};

export default queueReducer;
