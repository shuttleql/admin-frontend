import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import UserRegistration from '../components/UserRegistration';
import { fetchUsers } from '../actions'
import { registerUser, editUser, deleteUsers } from '../actions/user';
import _ from 'lodash';

const buttonStyle = {
  marginTop: 20,
  marginLeft: 20
};

const rightButtonStyle = {
  marginTop: 20,
  marginRight: 20,
  float: "right"
};

const paperStyle = {
  margin: 20
};

class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userForm: {
        show: false
      },
      selectedRows: []
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  renderRow (user, idx) {
    return (
      <TableRow key={user.id}
        selected={this.state.selectedRows.indexOf(idx) !== -1}>
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
        label={this.state.userForm.user ? "Update" : "Submit"}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitForm}
      />,
    ];
    return (
      <div>
        <Dialog
          contentStyle={{ width: 400 }}
          title={this.state.userForm.user ? "Edit Existing Member" :"Register New Member"}
          actions={actions}
          modal={false}
          open={this.state.userForm.show}
          onRequestClose={this.handleClose}
        >
          <UserRegistration ref="form" user={this.state.userForm.user} />
        </Dialog>

        <RaisedButton
          label="Register"
          primary={true}
          icon={<ContentAdd />}
          style={buttonStyle}
          onClick={() => { this.handleMemberCreate() }}
        />

        { this.state.selectedRows.length > 0 ?
          <RaisedButton
            label={"Delete (" + this.state.selectedRows.length + ")"}
            secondary={true}
            icon={<ActionDelete />}
            style={rightButtonStyle}
            onClick={() => { this.handleMemberDelete(this.state.selectedRows) }}
          /> : null }

        { this.state.selectedRows.length == 1 ?
          <RaisedButton
            label="Edit"
            primary={true}
            icon={<ContentCreate />}
            style={rightButtonStyle}
            onClick={() => { this.handleMemberEdit(this.state.selectedRows[0]) }}
          /> : null }

        <Paper zDepth={3} style={paperStyle}>
          <Table selectable={true} multiSelectable={true} onRowSelection={this.handleRowSelection}>
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
            <TableBody multiSelectable={true} deselectOnClickaway={false}>
              {
                this.props.users.map((user, idx) => this.renderRow(user, idx))
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

  handleRowSelection = (selection) => {
    if (typeof selection === 'string') {
      let selectedRows = [];
      if (selection === 'all') {
        for (let i=0; i<this.props.users.length; i++) {
          selectedRows.push(() => i);
        }
      }
      this.setState({ selectedRows: selectedRows });
    } else {
      this.setState({ selectedRows: selection });
    }
  };

  handleMemberCreate = () => {
    this.setState({
      userForm: {
        show: true
      }
    });
  };

  handleMemberEdit = (idx) => {
    const user = this.props.users[idx];
    this.setState({
      userForm: {
        show: true,
        user
      }
    });
  };

  handleMemberDelete = (selectedRows) => {
    this.props.delete(selectedRows.map(row => this.props.users[row].id));
  }

  handleClose = () => {
    this.setState({userForm: { show: false }});
  };

  submitForm = () => {
    if (!this.refs.form.validate()) {
      return;
    }

    const formState = this.refs.form.state;
    const user = {
      id: this.state.userForm.user ? this.state.userForm.user.id : this.props.users.length + 1,
      password: formState.password,
      email: formState.email,
      firstName: formState.firstName,
      lastName: formState.lastName,
      gender: formState.gender,
      level: parseInt(formState.level)
    };

    if (this.state.userForm.user) {
      this.props.edit(user);
    } else {
      this.props.register(user);
    }
    this.refs.form.resetState();

    this.handleClose();
  }
}

const mapStateToProps = (state) => {
  return {
    users: _.sortBy(state.users, 'id')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => {
      dispatch(registerUser(user));
    },
    edit: (user) => {
      dispatch(editUser(user));
    },
    delete: (userIds) => {
      dispatch(deleteUsers(userIds));
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
