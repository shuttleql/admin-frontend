import * as types from './types';
import config from '../config';
import request from './request';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function endSession() {
  return (dispatch) => {
    dispatch({
      type: 'END_SESSION'
    });

    request
      .getInstance()
      .put(`${config.GATEWAY_URL}/admin/session/status/stop`)
      .then((res) => {
        dispatch({
          type: 'SESSION_ENDED'
        });
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
      .get(`${config.GATEWAY_URL}/shared/users`)
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

export function beginMatchmaking() {
  return (dispatch) => {
    dispatch({
      type: 'BEGIN_MATCHMAKING'
    });

    request
      .getInstance()
      .put(`${config.GATEWAY_URL}/admin/session/status/start`)
      .then((res) => {
        if (res.status === 200) {
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
                  games: res.data
                });
              }
            })
            .catch((err) => { console.log(err) });
        }
      })
      .catch((err) => { console.log(err) });
  };
}
