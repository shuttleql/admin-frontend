import config from '../config';
import request from './request';

export function sendAnnouncement(message) {
  return (dispatch) => {
    request
      .getInstance()
      .post(`${config.GATEWAY_URL}/admin/announcements`, { message })
      .then((res) => {
        if (res.status === 200) {
          // TODO: Pagination
          dispatch(fetchAnnouncements(0, 1000));
        }
      })
      .catch((err) => { console.log(err) });
  };
}

export function fetchAnnouncements(offset, size) {
  return (dispatch) => {
    request
      .getInstance()
      .get(`${config.GATEWAY_URL}/shared/announcements/${offset}/${size}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: 'ANNOUNCEMENTS_FETCHED',
            announcements: res.data
          })
        }
      })
      .catch((err) => { console.log(err) });
  };
}
