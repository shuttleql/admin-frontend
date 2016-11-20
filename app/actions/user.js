import config from '../config';
import request from './request';

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
