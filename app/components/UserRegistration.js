import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const inputStyle = {
  textAlign: 'left',
  display: 'block',
  width: 340
};

const radioStyle = {
  marginTop: 20
};

class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: 'Male',
      level: 1
    };
  }

  render() {
    return (
      <form>
        <TextField
          style={inputStyle}
          floatingLabelText="First Name"
          hintText="e.g. John"
          value={this.state.firstName}
          onChange={this.onFirstNameChange}
        />
        <TextField
          style={inputStyle}
          floatingLabelText="Last Name"
          hintText="e.g. Doe"
          value={this.state.lastName}
          onChange={this.onLastNameChange}
        />
        <TextField
          style={inputStyle}
          floatingLabelText="Gender"
          hintText="e.g. male"
          value={this.state.gender}
          onChange={this.onGenderChange}
        />
        <TextField
          style={inputStyle}
          floatingLabelText="Email"
          hintText="e.g. user@shuttleql.com"
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <TextField
          style={inputStyle}
          type="password"
          floatingLabelText="Password"
          hintText="e.g. shuttleqlisthebest123"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <TextField
          style={inputStyle}
          floatingLabelText="Level"
          hintText="e.g. 3"
          value={this.state.level}
          onChange={this.onLevelChange}
        />
      </form>
    );
  }

  resetState = () => {
    this.setState({
      error: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: 'Male',
      level: 1
    });
  }

  onFirstNameChange = (e) => {
    this.setState({
      firstName: e.target.value
    })
  }

  onLastNameChange = (e) => {
    this.setState({
      lastName: e.target.value
    })
  }

  onGenderChange = (e) => {
    this.setState({
      gender: e.target.value
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

  onLevelChange = (e) => {
    this.setState({
      level: e.target.value
    })
  }
}

export default UserRegistration;
