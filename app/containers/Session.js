import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

const paperStyle = {
  margin: 20
};

class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <div>
        <Paper zDepth={3} style={paperStyle}>
          Session
        </Paper>
      </div>
    );
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
)(Session);
