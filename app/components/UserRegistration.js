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
      errors: {
        firstName: false,
        lastName: false,
        gender: false,
        email: false,
        password: false,
        level: false
      },
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
          errorText={this.state.errors.firstName && 'First name cannot be blank.'}
          floatingLabelText="First Name"
          hintText="e.g. John"
          value={this.state.firstName}
          onChange={this.onFirstNameChange}
        />
        <TextField
          style={inputStyle}
          errorText={this.state.errors.lastName && 'Last name cannot be blank.'}
          floatingLabelText="Last Name"
          hintText="e.g. Doe"
          value={this.state.lastName}
          onChange={this.onLastNameChange}
        />
        <TextField
          style={inputStyle}
          errorText={this.state.errors.gender && 'Gender cannot be blank.'}
          floatingLabelText="Gender"
          hintText="e.g. male"
          value={this.state.gender}
          onChange={this.onGenderChange}
        />
        <TextField
          style={inputStyle}
          errorText={this.state.errors.email && 'Email cannot be blank.'}
          floatingLabelText="Email"
          hintText="e.g. user@shuttleql.com"
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <TextField
          style={inputStyle}
          errorText={this.state.errors.password && 'Password cannot be blank.'}
          type="password"
          floatingLabelText="Password"
          hintText="e.g. shuttleqlisthebest123"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <TextField
          style={inputStyle}
          errorText={this.state.errors.level && 'Level cannot be blank.'}
          floatingLabelText="Level"
          hintText="e.g. 3"
          value={this.state.level}
          onChange={this.onLevelChange}
        />
      </form>
    );
  }

  validate = () => {
    const errors = {};
    let invalidated = false;

    const fields = ['firstName', 'lastName', 'gender', 'email', 'password', 'level'];

    for (let field of fields) {
      if (!this.state[field]) {
        errors[field] = true;
        invalidated = true;
      }
    }

    this.setState({
      errors
    });

    return !invalidated;
  }

  resetState = () => {
    this.setState({
      errors: {
        firstName: false,
        lastName: false,
        gender: false,
        email: false,
        password: false,
        level: false
      },
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
      errors: Object.assign({}, this.state.errors, {
        firstName: false
      }),
      firstName: e.target.value
    })
  }

  onLastNameChange = (e) => {
    this.setState({
      errors: Object.assign({}, this.state.errors, {
        lastName: false
      }),
      lastName: e.target.value
    })
  }

  onGenderChange = (e) => {
    this.setState({
      errors: Object.assign({}, this.state.errors, {
        gender: false
      }),
      gender: e.target.value
    })
  }

  onEmailChange = (e) => {
    this.setState({
      errors: Object.assign({}, this.state.errors, {
        email: false
      }),
      email: e.target.value
    })
  }

  onPasswordChange = (e) => {
    this.setState({
      errors: Object.assign({}, this.state.errors, {
        password: false
      }),
      password: e.target.value
    })
  }

  onLevelChange = (e) => {
    this.setState({
      errors: Object.assign({}, this.state.errors, {
        level: false
      }),
      level: e.target.value
    })
  }
}

export default UserRegistration;
