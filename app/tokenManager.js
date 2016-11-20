export default {
  storeToken(token) {
    localStorage.setItem('token', token);
  },

  clearToken() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.token;
  }
}
