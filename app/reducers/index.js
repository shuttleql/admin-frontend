import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import UsersReducer from './users';
import SessionReducer from './session';
import GamesReducer from './games';
import QueueReducer from './queue';
import * as types from '../actions/types';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
  session: SessionReducer,
  users: UsersReducer,
  games: GamesReducer,
  queue: QueueReducer,
  filter,
  routing
});

export default rootReducer;
