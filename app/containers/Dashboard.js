import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import People from 'material-ui/svg-icons/social/people';
import Schedule from 'material-ui/svg-icons/action/schedule';
import AppBar from 'material-ui/AppBar';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
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
            <ListItem primaryText="Session" leftIcon={<Schedule />} />
            <ListItem primaryText="User Management" leftIcon={<People />} />
          </List>
        </Drawer>
        <AppBar
          title="ShuttleQL Administration"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.onOpenMenu}
        />
      </div>
    );
  }

  onOpenMenu = (e) => {
    this.setState({
      open: true
    });
  }
};

Dashboard.propTypes = {
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
