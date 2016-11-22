import React, { PropTypes, Component } from 'react';

class MatchTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: (props.nextRotationTime - Date.now()) / 1000
    };
  }

  componentDidMount() {
    const rotationTimerId = setInterval(this.rotationTimeTick, 1000);
    this.setState({ rotationTimerId });
  }

  componentWillUnmount() {
    clearInterval(this.state.rotationTimerId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.rotationTimerId) {
      clearInterval(this.state.rotationTimerId);
    }
    const rotationTimerId = setInterval(this.rotationTimeTick, 1000);
    this.setState({
      timeLeft: (nextProps.nextRotationTime - Date.now()) / 1000,
      rotationTimerId
    });
  }

  secondsToString = (seconds) => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
  }

  rotationTimeTick = () => {
    const timeLeft = this.state.timeLeft - 1;
    if (timeLeft >= 0) {
      this.setState({ timeLeft });
    } else {
      clearInterval(this.state.rotationTimerId);
    }
  }

  render() {
    return (
      <span>( {this.secondsToString(this.state.timeLeft)} left )</span>
    );
  }

}

MatchTimer.propTypes = {
  nextRotationTime: PropTypes.number
};

export default MatchTimer;
