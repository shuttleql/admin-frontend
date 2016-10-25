const initialState = [
  {
    id: 1,
    email: 'clement@uwaterloo.ca',
    firstName: 'Clement',
    lastName: 'Hoang',
    gender: 'male',
    level: 4,
    checkedIn: false
  },
  {
    id: 2,
    email: 'david@uwaterloo.ca',
    firstName: 'David',
    lastName: 'Dong',
    gender: 'male',
    level: 1,
    checkedIn: false
  },
  {
    id: 3,
    email: 'jason@uwaterloo.ca',
    firstName: 'Jason',
    lastName: 'Fang',
    gender: 'male',
    level: 5,
    checkedIn: false
  },
  {
    id: 4,
    email: 'tonya@uwaterloo.ca',
    firstName: 'Tonya',
    lastName: 'Lu',
    gender: 'female',
    level: 3,
    checkedIn: false
  }
];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return state.concat(action.user);
    case 'CHECK_IN_USER':
      return state.map(u => {
        if (u.id === action.id) {
          return {
            ...u,
            checkedIn: true
          };
        } else {
          return u;
        }
      });
    case 'CHECK_OUT_USER':
      return state.map(u => {
        if (u.id === action.id) {
          return {
            ...u,
            checkedIn: false
          };
        } else {
          return u;
        }
      });
    case 'END_SESSION':
      return state.map(u => {
        return {
          ...u,
          checkedIn: false
        };
      });
    default:
      return state;
  }
};

export default usersReducer;
