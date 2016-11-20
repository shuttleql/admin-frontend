import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import People from 'material-ui/svg-icons/social/people';
import Schedule from 'material-ui/svg-icons/action/schedule';
import Announcement from 'material-ui/svg-icons/action/announcement';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {fetchMatches, fetchUsers} from '../actions';
import {getCurrentSessionAsync} from '../actions/session';
import tokenManager from '../tokenManager';
import Config from '../config';

const io = require('socket.io-client/socket.io');
const socket = io(Config.PIGEON_SOCKET_URL, {jsonp: false});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    socket.on('connect', () => {
      console.log('Connected to Pigeon.')
    });

    socket.on('update', (data) => {
      console.log('Stale data, resource: ', data);

      switch (data.resource) {
        case 'users':
          this.props.fetchUsers();
          break;
        case 'session':
          this.props.fetchSession();
          break;
        case 'matches':
          this.props.fetchMatches();
          break;
      }
    });
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <List>
            <ListItem primaryText="Session" leftIcon={<Schedule />} onClick={this.onClickMenuItem.bind(this, '/dashboard/session')} />
            <ListItem primaryText="User Management" leftIcon={<People />} onClick={this.onClickMenuItem.bind(this, '/dashboard/user')} />
            <ListItem primaryText="Announcement" leftIcon={<Announcement />} onClick={this.onClickMenuItem.bind(this, '/dashboard/announcement')} />
          </List>
        </Drawer>
        <AppBar
          title="ShuttleQL Administration"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementRight={
            <FlatButton
              label="Logout"
              onClick={this.onLogoutButtonClick}
              />
          }
          onLeftIconButtonTouchTap={this.onOpenMenu}
        />
        {this.props.children}
      </div>
    );
  }

  onLogoutButtonClick = (e) => {
    tokenManager.clearToken();
    browserHistory.push("/login");
  }

  onOpenMenu = (e) => {
    this.setState({
      open: true
    });
  }

  onClickMenuItem = (url) => {
    browserHistory.push(url);

    this.setState({
      open: false
    });
  }
};

Dashboard.propTypes = {
  children: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMatches: () => {
      dispatch(fetchMatches());
    },
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
    fetchSession: () => {
      dispatch(getCurrentSessionAsync());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
