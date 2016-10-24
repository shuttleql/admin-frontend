module.exports = {
  login(email, pass, cb) {
    if (localStorage.token) {
      if (cb) {
        cb(true)
      }

      return
    }

    performRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = 'dummy'

        if (cb) {
          cb(true)
        }
      } else {
        if (cb) {
          cb(false)
        }
      }
    })
  },

  getToken() {
    return localStorage.token
  }
}

function performRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
