import config from './config';
import request from './actions/request';
import tokenManager from './tokenManager';

export default {
  login(email, password, cb) {
    request
      .getInstance()
      .post(`${config.GATEWAY_URL}/shared/auth`, {
        email: email,
        password: password
      })
      .then((res) => {
        if (res.status == 200) {
          var authToken = res.data.token;
          tokenManager.storeToken(authToken);
          cb && cb(true);
        } else {
          cb && cb(false);
        }
      })
  }
}