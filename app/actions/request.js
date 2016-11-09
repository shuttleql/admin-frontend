import axios from 'axios';
import token from '../token';

export default {
  getInstance() {
    var instance = axios.create();
    instance.defaults.timeout = 2500;
    if (token.getToken()) {
      instance.defaults.headers.common['token'] = token.getToken();
    }
    return instance;
  }
}