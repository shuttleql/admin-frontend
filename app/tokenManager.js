export default {
  storeToken(token) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.token;
  }
}