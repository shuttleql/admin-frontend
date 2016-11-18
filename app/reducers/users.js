/* A user should look something like this:
{
  id: 1,
  email: 'clement@uwaterloo.ca',
  firstName: 'Clement',
  lastName: 'Hoang',
  gender: 'male',
  level: 4,
  checkedIn: false
}
*/

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_REGISTERED':
      return state.concat({
        ...action.user,
        checkedIn: false
      });
    case 'USER_EDITED':
      return state.map(u => {
        if (u.id === action.user.id) {
          return action.user;
        } else {
          return u;
        }
      });
    case 'USER_DELETED':
      return state.filter(u => {
        return u.id != action.userId;
      });
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
    case 'USERS_FETCHED':
      return action.users.map(u => ({
        ...u,
      }));
    default:
      return state;
  }
};

export default usersReducer;
