import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Session from './containers/Session';
import Announcement from './containers/Announcement';
import UserManagement from './containers/UserManagement';
import tokenManager from './tokenManager'

function requireAuth(nextState, replace) {
  if (!tokenManager.getToken()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
	<Route path="/" component={App}>
		<IndexRedirect to="dashboard" />
		<Route path="login" component={Login} />
		<Route path="dashboard" component={Dashboard} onEnter={requireAuth}>
      <IndexRedirect to="session" />
      <Route path="session" component={Session} onEnter={requireAuth} />
      <Route path="user" component={UserManagement} onEnter={requireAuth} />
      <Route path="announcement" component={Announcement} onEnter={requireAuth} />
    </Route>
	</Route>
);
