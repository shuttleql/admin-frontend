import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import UserRegistration from '../components/UserRegistration';
import { registerUser, fetchUsers } from '../actions';

const buttonStyle = {
  marginTop: 20,
  marginLeft: 20
};

const paperStyle = {
  margin: 20
};

class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRegisterForm: false
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  renderRow (user) {
    return (
      <TableRow key={user.id}>
        <TableRowColumn>{user.id}</TableRowColumn>
        <TableRowColumn>{user.email}</TableRowColumn>
        <TableRowColumn>{user.firstName}</TableRowColumn>
        <TableRowColumn>{user.lastName}</TableRowColumn>
        <TableRowColumn>{user.gender}</TableRowColumn>
        <TableRowColumn>{user.level}</TableRowColumn>
        <TableRowColumn>{user.checkedIn ? 'yes' : 'no'}</TableRowColumn>
      </TableRow>
    );
  }

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
        style={{ marginRight: 6 }}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitForm}
      />,
    ];
    return (
      <div>
        <Dialog
          contentStyle={{ width: 400 }}
          title="New Member Registration"
          actions={actions}
          modal={false}
          open={this.state.showRegisterForm}
          onRequestClose={this.handleClose}
        >
          <UserRegistration ref="form" />
        </Dialog>

        <RaisedButton
          label="Register a new member"
          primary={true}
          style={buttonStyle}
          onClick={() => { this.setState({ showRegisterForm: true }) }}
        />

        <Paper zDepth={3} style={paperStyle}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Gender</TableHeaderColumn>
                <TableHeaderColumn>Level</TableHeaderColumn>
                <TableHeaderColumn>Checked In</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                this.props.users.map(user => this.renderRow(user))
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

  handleOpen = () => {
    this.setState({showRegisterForm: true});
  };

  handleClose = () => {
    this.setState({showRegisterForm: false});
  };

  submitForm = () => {

    if (!this.refs.form.validate()) {
      return;
    }

    const formState = this.refs.form.state;
    const user = {
      id: this.props.users.length + 1,
      password: formState.password,
      email: formState.email,
      firstName: formState.firstName,
      lastName: formState.lastName,
      gender: formState.gender,
      level: parseInt(formState.level)
    };

    this.props.register(user);
    this.refs.form.resetState();

    this.handleClose();
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => {
      dispatch(registerUser(user));
    },
    fetchUsers: () => {
      dispatch(fetchUsers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
