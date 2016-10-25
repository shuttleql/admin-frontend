import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import UserRegistration from '../components/UserRegistration';

const buttonStyle = {
  marginTop: 20,
  marginLeft: 20
};

const paperStyle = {
  margin: 20
};

class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRegisterForm: false
    };
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
        onTouchTap={this.handleClose}
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
          <UserRegistration />
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
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Gender</TableHeaderColumn>
                <TableHeaderColumn>Level</TableHeaderColumn>
                <TableHeaderColumn>Checked In</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>John</TableRowColumn>
                <TableRowColumn>Smith</TableRowColumn>
                <TableRowColumn>Male</TableRowColumn>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>yes</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Randal</TableRowColumn>
                <TableRowColumn>White</TableRowColumn>
                <TableRowColumn>Female</TableRowColumn>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>yes</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Stephanie</TableRowColumn>
                <TableRowColumn>Sanders</TableRowColumn>
                <TableRowColumn>Female</TableRowColumn>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>yes</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve</TableRowColumn>
                <TableRowColumn>Brown</TableRowColumn>
                <TableRowColumn>Male</TableRowColumn>
                <TableRowColumn>5</TableRowColumn>
                <TableRowColumn>no</TableRowColumn>
              </TableRow>
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
}

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
)(Session);
