import * as types from './types';
import config from '../config';
import request from './request';
import { stopSessionAsync } from './session';

// stop match making, then stop session
export function endSession() {
  return (dispatch) => {
    dispatch({
      type: 'END_SESSION'
    });

    request
      .getInstance()
      .put(`${config.GATEWAY_URL}/admin/session/status/stop`)
      .then((res) => {
        dispatch(stopSessionAsync()).then(() => {
          dispatch({
            type: 'SESSION_ENDED'
          });
        })
      })
      .catch((err) => { console.log(err) });
  }
}

export function fetchUsers() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_USER'
    });

    request
      .getInstance()
      .get(`${config.GATEWAY_URL}/admin/users`)
      .then((res) => {
        dispatch({
          type: 'USERS_FETCHED',
          users: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function registerUser(user) {
  return (dispatch) => {
    dispatch({
      type: 'REGISTER_USER'
    });

    request
      .getInstance()
      .post(`${config.GATEWAY_URL}/admin/user/register`, user)
      .then((res) => {
        dispatch({
          type: 'USER_REGISTERED',
          user: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function fetchMatches() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_MATCH_DATA'
    });

    request
      .getInstance()
      .get(`${config.GATEWAY_URL}/shared/game`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: 'RECEIVE_MATCH_DATA',
            games: res.data.matches,
            queue: res.data.queue
          });
        }
      })
      .catch((err) => { console.log(err) });
  }
}

export function editUser(user) {
  return (dispatch) => {
    request
      .getInstance()
      .put(`${config.GATEWAY_URL}/admin/user/${user.id}`, user)
      .then((res) => {
        dispatch({
          type: 'USER_EDITED',
          user: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function deleteUsers(userIds) {
  return (dispatch) => {
    for (let userId of userIds) {
      request
        .getInstance()
        .delete(`${config.GATEWAY_URL}/admin/user/${userId}`)
        .then((res) => {
          console.log(userId);
          dispatch({
            type: 'USER_DELETED',
            userId
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

export function beginMatchmaking(players) {
  return (dispatch) => {
    dispatch({
      type: 'BEGIN_MATCHMAKING'
    });

    request
      .getInstance()
      .put(`${config.GATEWAY_URL}/admin/session/status/start`, players.map(p => ({
        id: p.id,
        name: `${p.firstName} ${p.lastName}`,
        level: p.level,
        preference: p.preference
      })))
      .then((res) => {
        if (res.status === 200) {
          dispatch(fetchMatches())
        }
      })
      .catch((err) => { console.log(err) });
  };
}
