import axios from 'axios';
import tokenManager from '../tokenManager';

export default {
  getInstance() {
    // Create an instance with global defaults, 
    // otherwise instance header seems to be cached
    var instance = axios.create(axios.defaults);
    instance.defaults.timeout = 5000;
    var token = tokenManager.getToken();
    if (token) {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return instance;
  }
}