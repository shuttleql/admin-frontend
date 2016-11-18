import config from '../config';
import request from './request';

export function createSessionAsync() {
  return (dispatch) => {
    return request
      .getInstance()
      .post(`${config.GATEWAY_URL}/admin/session/create`)
      .catch((err) => { console.log(err) });
  }
}

export function checkInUserAsync() {

}

export function checkOutUserAsync() {

}

export function stopSessionAsync() {
  return (dispatch) => {
    return request
      .getInstance()
      .put(`${config.GATEWAY_URL}/admin/session/end`)
      .catch((err) => { console.log(err) });
  }
}

export function getCurrentSessionAsync() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_CURRENT_SESSION'
    });

    return request
      .getInstance()
      .get(`${config.GATEWAY_URL}/admin/session/current`)
      .then((res) => {
        dispatch({
          type: 'FETCHED_CURRENT_SESSION',
          session: res.data
        });
      })
      .catch((err) => { console.log(err) });
  }
}
