import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from '../auth'

const paperStyle = {
  height: 400,
  width: 400,
  margin: 'auto',
  marginTop: 160,
  textAlign: 'center',
  padding: 30
};

const buttonStyle = {
  marginTop: 30
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <div>
        <Paper style={paperStyle} zDepth={3} rounded={false}>
          <form>
            <h1>
              ShuttleQL Admin
            </h1>

            <TextField
              floatingLabelText="Email"
              hintText="e.g. user@shuttleql.com"
              value={this.state.email}
              onChange={this.onEmailChange}
            />
            <TextField
              type='password'
              floatingLabelText="Password"
              hintText="e.g. shuttleqlisthebest123"
              value={this.state.password}
              onChange={this.onPasswordChange}
              errorText={this.state.error ? "Incorrect password." : null}
            />

            <RaisedButton
              label="Sign In"
              primary={true}
              fullWidth={true}
              style={buttonStyle}
              onClick={this.onSignIn}
            />
          </form>
        </Paper>
      </div>
    );
  }

  onSignIn = (e) => {
    this.setState({ error: false });

    Auth.login(this.state.email, this.state.password, (success) => {
      if (success) {
        browserHistory.push('/dashboard');
      } else {
        this.setState({ error: true });
      }
    })
  }

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }
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
)(Login);
