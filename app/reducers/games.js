const initialState = [];

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MATCH_DATA':
      return action.games.map(g => {
        if (g.team1.length + g.team2.length === 3) {
          if (g.team1.length === 1) { // other team has 2
            return {
              ...g,
              team1: g.team2,
              team2: [],
              unfilled: true,
              type: 'Doubles'
            }
          } else {
            return {
              ...g,
              unfilled: true,
              type: 'Doubles'
            }
          }
        } else if (g.team1.length + g.team2.length === 2) {
          if (g.team1.length === 2) {
            return {
              ...g,
              unfilled: true,
              type: 'Singles'
            }
          } else if (g.team2.length === 2) {
            return {
              ...g,
              team1: g.team2,
              team2: [],
              unfilled: true,
              type: 'Singles'
            }
          } else {
            return {
              ...g,
              unfilled: false,
              type: 'Singles'
            }
          }

        } else if (g.team1.length + g.team2.length === 1) {
          // TODO: there is a bug here where there is 1 player on a doubles court. A change is needed in the backend to return court type to fix this.
          if (g.team1.length === 1) { // other team has 0
            return {
              ...g,
              unfilled: true,
              type: 'Singles'
            }
          } else {
            return {
              ...g,
              team1: g.team2,
              team2: [],
              unfilled: true,
              type: 'Singles'
            }
          }
        } else {
          return {
            ...g,
            unfilled: false,
            type: g.team1.length,
            type: 'Doubles'
          }
        }
      })
    case 'END_SESSION':
      return [];
    default:
      return state;
  }
};

export default gameReducer;
