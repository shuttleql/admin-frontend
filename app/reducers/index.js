import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import UsersReducer from './users';
import SessionReducer from './session';
import GamesReducer from './games';
import QueueReducer from './queue';
import AnnouncementReducer from './announcements';

const rootReducer = combineReducers({
  session: SessionReducer,
  users: UsersReducer,
  games: GamesReducer,
  queue: QueueReducer,
  announcements: AnnouncementReducer,
  routing
});

export default rootReducer;
