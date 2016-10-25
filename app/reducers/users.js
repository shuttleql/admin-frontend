const initialState = [
  {
    id: 1,
    email: 'clement@uwaterloo.ca',
    firstName: 'Clement',
    lastName: 'Hoang',
    gender: 'male',
    level: 4,
    checkedIn: true
  },
  {
    id: 2,
    email: 'david@uwaterloo.ca',
    firstName: 'David',
    lastName: 'Dong',
    gender: 'male',
    level: 1,
    checkedIn: true
  },
  {
    id: 3,
    email: 'jason@uwaterloo.ca',
    firstName: 'Jason',
    lastName: 'Fang',
    gender: 'male',
    level: 5,
    checkedIn: true
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
    default:
      return state;
  }
};

export default usersReducer;
