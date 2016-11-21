const initialState = {
  games: [],
  queue: [],
  timeLeft: 0
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MATCH_DATA':
      return {
        games: action.games.map(g => {
          return {
            ...g,
            unfilled: isUnfilled(g)
          };
        }),
        queue: action.queue,
        timeLeft: action.timeLeft
      };
    case 'END_SESSION':
      return initialState;
    default:
      return state;
  }
};

function isUnfilled(match) {
  if (match.courtType === 'Singles') {
    return match.team1.length + match.team2.length !== 2;
  } else if (match.courtType === 'Doubles') {
    return match.team1.length + match.team2.length !== 4;
  } else {
    return false;
  }
}

export default matchReducer;
