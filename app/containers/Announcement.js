import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentSend from 'material-ui/svg-icons/content/send';
import { sendAnnouncement, fetchAnnouncements } from '../actions/announcement';

class Announcement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCreateDialog: false,
      createDialog: {
        error: false,
        message: ''
      }
    };
  }

  componentDidMount() {
    this.props.fetchAnnouncements();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label={"Send"}
        primary={true}
        icon={<ContentSend />}
        onTouchTap={this.sendAnnouncement}
      />,
    ];

    const dateStyle = {
      width: 300
    }

    return (
      <div>
        <Dialog
          contentStyle={{ width: 750 }}
          title="Send new Announcement"
          actions={actions}
          modal={false}
          open={this.state.showCreateDialog}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Message"
            errorText={this.state.createDialog.error ? "Message cannot be empty" : null}
            multiLine={true}
            rows={4}
            rowsMax={4}
            style={{width:'100%'}}
            value={this.state.createDialog.message}
            onChange={this.onMessageChange}
          />
        </Dialog>
        <RaisedButton
          label="Create"
          primary={true}
          icon={<ContentAdd />}
          style={{ marginTop: 20, marginLeft: 20 }}
          onClick={this.handleAnnouncementCreate}
        />
        <Paper zDepth={3} style={{ margin: 20 }}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={dateStyle}>Date</TableHeaderColumn>
                <TableHeaderColumn>Message</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                this.props.announcements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableRowColumn style={dateStyle}>{announcement.ctime}</TableRowColumn>
                    <TableRowColumn>{announcement.message}</TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

  onMessageChange = (e) => {
    this.setState({
      createDialog: {
        ...this.state.createDialog,
        message: e.target.value,
        error: false
      }
    });
  }

  handleAnnouncementCreate = () => {
    this.setState({ showCreateDialog: true });
  };

  handleClose = () => {
    this.setState({
      showCreateDialog: false,
      createDialog: {
        ...this.state.createDialog,
        message: ''
      }
    });
  };

  sendAnnouncement = () => {
    const message = this.state.createDialog.message;
    if (message === '') {
      this.setState({
        createDialog: {
          ...this.state.createDialog,
          error: true
        }
      });
      return;
    }

    this.props.send(message);
    this.handleClose();
  }
};

const mapStateToProps = (state) => {
  return {
    announcements: state.announcements
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    send: (message) => {
      dispatch(sendAnnouncement(message));
    },
    fetchAnnouncements: () => {
      // TODO: Pagination
      dispatch(fetchAnnouncements(0,10000));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Announcement);
