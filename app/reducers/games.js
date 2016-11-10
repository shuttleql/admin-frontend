const initialState = [];

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MATCH_DATA':
      return action.games.map(g => {
        return {
          ...g,
          team1: (g.team2.length && !g.team1.length) ? g.team2 : g.team1,
          team2: (g.team2.length && !g.team1.length) ? [] : g.team2
        }
      })
    case 'END_SESSION':
      return [];
    default:
      return state;
  }
};

export default gameReducer;
