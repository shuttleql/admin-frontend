import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import FilterableTable from './containers/FilterableTable';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import About from './components/About';
import auth from './auth';

function requireAuth(nextState, replace) {
  if (!auth.getToken()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
	<Route path="/" component={App}>
		<IndexRedirect to="/dashboard" />
		<Route path="/login" component={Login} />
		<Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
	</Route>
);
