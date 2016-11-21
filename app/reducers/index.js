import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import UsersReducer from './users';
import SessionReducer from './session';
import MatchReducer from './match';
import AnnouncementReducer from './announcements';

const rootReducer = combineReducers({
  session: SessionReducer,
  users: UsersReducer,
  match: MatchReducer,
  announcements: AnnouncementReducer,
  routing
});

export default rootReducer;
