import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {Tabs, Tab} from 'material-ui/Tabs';
import {beginMatchmaking as startMatchmaking, endSession as finishSession, fetchMatches, fetchUsers} from '../actions';
import {getCurrentSessionAsync} from '../actions/session';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {orange500, blue500, red500, lightGreen500, pink500 } from 'material-ui/styles/colors';

const paperStyle = {
  margin: 20
};

const chipStyle = {
  margin: 4
};

const chipsContainer = {
  display: 'flex',
  flexWrap: 'wrap'
};

const cardStyle = {
  margin: 5,
  width: 300,
  height: 270,
  display: 'inline-block'
};

const levelColors = [orange500, blue500, red500, lightGreen500, pink500];

class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchSession()
    this.props.fetchUsers()
    this.props.fetchMatches()
  }

  renderCourt(game) {
    const titleText = `${game.courtType} ${game.unfilled ? '(Unfilled)' : ''}`

    switch (game.courtType) {
      case 'Singles':
        return (
          <Card key={game.courtId} style={cardStyle}>
            <CardTitle title={game.courtName} subtitle={titleText} />
            <CardText>
              {game.team1[0] && game.team1[0].name || '?'}
              <br/>
              <br/>
            </CardText>
            <CardText style={{color: 'rgba(0, 0, 0, 0.541176)'}}>
              vs
            </CardText>
            <CardText>
              {game.team2[0] && game.team2[0].name || '?'}
              <br/>
              <br/>
            </CardText>
          </Card>
        )
      case 'Doubles':
        return (
          <Card key={game.courtId} style={cardStyle}>
            <CardTitle title={game.courtName} subtitle={titleText} />
            <CardText>
              {game.team1[0] && game.team1[0].name || '?'}
              <br/>
              {game.team1[1] && game.team1[1].name || '?'}
            </CardText>
            <CardText style={{color: 'rgba(0, 0, 0, 0.541176)'}}>
              vs
            </CardText>
            <CardText>
              {game.team2[0] && game.team2[0].name || '?'}
              <br/>
              {game.team2[1] && game.team2[1].name || '?'}
            </CardText>
          </Card>
        )
    }
  }

  render() {
    return (
      <Tabs>
        <Tab label="Setup">
          <div style={{ padding: 20}}>
            <div style={{ display: 'block'}}>
              { this.props.session.started ? <RaisedButton
                label="Begin matchmaking"
                style={{ marginRight: 10 }}
                primary={true}
                disabled={!!this.props.games.length}
                onTouchTap={() => {
                  this.props.beginMatchmaking(this.props.checkedInUsers)
                }}
              /> : null }
              { this.props.session.started ? <RaisedButton
                label="End Session"
                secondary={true}
                onTouchTap={this.props.endSession}
              /> : null }
              { !this.props.session.started ? <RaisedButton
                label="Begin Session"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.startSession}
              /> : null }
            </div>
            { this.props.session.started ? this.renderCheckedInUsers() : null }
          </div>
        </Tab>
        <Tab label="Matches">
          { this.props.queue.length ? (
            <div style={{ padding: 20, width: 250, float: 'left' }}>
              <List disabled={true}>
                <Subheader>Queue</Subheader>
                {
                  this.props.queue.map(player => (
                    <ListItem
                      key={player.id}
                      primaryText={player.name}
                      leftAvatar={
                        <Avatar backgroundColor={levelColors[player.level - 1]}>
                          {player.level}
                        </Avatar>
                      }
                      secondaryText={player.preference === 'Singles' ? player.preference + ' preferred' : null}
                    />
                  ))
                }
              </List>
            </div>
          ) : null }
          { this.props.games.length ? (
            <div style={{ padding: 20, overflow: 'hidden' }}>
              <Subheader>Courts</Subheader>
              {this.props.games.map(game => this.renderCourt(game))}
            </div>
          ) : (<div style={{ padding: 20, overflow: 'hidden' }}>
            <p>Matchmaking has not started yet.</p>
            </div>
          ) }
        </Tab>
      </Tabs>
    );
  }

  renderCheckedInUsers() {
    return (
      <Card style={{ marginTop: 20 }}>
        <CardTitle title="Checked In Members" subtitle="This is where you can check in and check out players for the current session." />
        <CardText>
          <AutoComplete
            ref="autocomplete"
            floatingLabelText="Start typing a member's name..."
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.props.checkedOutUsers}
            dataSourceConfig={{
              text: 'prettyText',
              value: 'id'
            }}
            onNewRequest={this.checkinUser}
            style={{ display: 'block' }}
          />
          <div style={chipsContainer}>
            {
              this.props.checkedInUsers.map(u => (
                <Chip
                  key={u.id}
                  onRequestDelete={() => { this.props.checkoutUser(u.id) }}
                  style={chipStyle}
                >
                  <Avatar icon={<SvgIconFace />} />
                  {`${u.firstName} ${u.lastName}, ${u.level}`}
                </Chip>
              ))
            }
          </div>
        </CardText>
      </Card>
    );
  }

  checkinUser = (user) => {
    this.props.checkinUser(user);
    this.refs.autocomplete.setState({
      searchText: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    checkedInUsers: state.users.filter(u => u.checkedIn),
    checkedOutUsers: state.users.filter(u => !u.checkedIn).map(u => ({
      ...u,
      prettyText: `${u.firstName} ${u.lastName}, ${u.level}`
    })),
    session: state.session,
    games: state.games,
    queue: state.queue
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startSession: () => {
      dispatch({
        type: 'START_SESSION'
      });
    },
    endSession: () => {
      dispatch(finishSession());
    },
    checkinUser: (user) => {
      dispatch({
        type: 'CHECK_IN_USER',
        id: user.id
      });
    },
    checkoutUser: (id) => {
      dispatch({
        type: 'CHECK_OUT_USER',
        id
      });
    },
    beginMatchmaking: (users) => {
      dispatch(startMatchmaking(users));
    },
    fetchMatches: () => {
      dispatch(fetchMatches());
    },
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
    fetchSession: () => {
      dispatch(getCurrentSessionAsync());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);
