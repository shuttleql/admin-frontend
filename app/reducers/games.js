const initialState = [];

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MATCH_DATA':
      return action.games.map(g => {
        return {
          ...g,
          unfilled: isUnfilled(g)
        };
      });
    case 'END_SESSION':
      return [];
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

export default gameReducer;
