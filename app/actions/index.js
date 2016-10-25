import * as types from './types';
import axios from 'axios';
import config from '../config';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function beginMatchmaking() {
  return (dispatch) => {
    dispatch({
      type: 'BEGIN_MATCHMAKING'
    });

    axios
      .put(`${config.GATEWAY_URL}/admin/session/status/start`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: 'FETCH_MATCH_DATA'
          });

          axios
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
