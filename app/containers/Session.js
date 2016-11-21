import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {Tabs, Tab} from 'material-ui/Tabs';
import {beginMatchmaking as startMatchmaking, endSession as finishSession, fetchMatches, fetchUsers, overrideMatch} from '../actions';
import {getCurrentSessionAsync, createSessionAsync, stopSessionAsync, checkInUserAsync, checkOutUserAsync} from '../actions/session';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionQueryBuilder from 'material-ui/svg-icons/action/query-builder';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {orange500, blue500, red500, lightGreen500, pink500 } from 'material-ui/styles/colors';
import MatchTimer from '../components/MatchTimer';
import _ from 'lodash';

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

    this.state = {
      override: {}
    };
  }

  componentDidMount() {
    this.props.fetchSession();
    this.props.fetchUsers();
    this.props.fetchMatches();
  }

  handleOverrideTap = (e) => {
    e.preventDefault();

    const newState = this.state;
    newState.override[e.target.id] = {
      open: true,
      anchorEl: e.currentTarget
    };
    this.setState(newState);
  };

  handleOverrideClose = () => {
    const override = _.mapValues(this.state.override, (val) => { return { open: false }});
    this.setState({
      overrideId1: null,
      overrideId2: null,
      override
    });
  };

  handleOverrideReplace = (event, index, value) => {
    this.setState({ overrideId1: value });
  };

  handleOverrideWith = (event, index, value) => {
    this.setState({ overrideId2: value });
  };

  handleOverrideConfirm = () => {
    this.props.overrideMatch(this.state.overrideId1, this.state.overrideId2);
    this.handleOverrideClose();
  };

  renderCourt(game) {
    const titleText = `${game.courtType} ${game.unfilled ? '(Unfilled)' : ''}`;
    const gamePlayers = _.reject(this.props.checkedInUsers, (user) => {
      return user.id === this.state.overrideId1;
    });
    return (
      <Card key={game.courtId} style={cardStyle}>
        <CardTitle
          title={
            <div>
              <span>{game.courtName}</span>
              <FlatButton label={<span id={game.courtId}>Override</span>} secondary={true} style={{float: 'right'}} onTouchTap={this.handleOverrideTap} />
                <Popover
                  open={this.state.override[game.courtId] ? this.state.override[game.courtId].open : false }
                  anchorEl={this.state.override[game.courtId] ? this.state.override[game.courtId].anchorEl : null}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  style={{ width: 275 }}
                  onRequestClose={this.handleOverrideClose}
                >
                  Replace
                  <DropDownMenu value={this.state.overrideId1 ? this.state.overrideId1 : null}
                    autoWidth={false}
                    style={{ width: 200 }}
                    onChange={this.handleOverrideReplace}>
                    {
                      _.concat(game.team1, game.team2).map(player => (
                        <MenuItem key={player.id} value={player.id} primaryText={player.name} />
                      ))
                    }
                  </DropDownMenu>
                  With
                  <DropDownMenu value={this.state.overrideId2 ? this.state.overrideId2 : null}
                    autoWidth={false}
                    style={{ width: 200 }}
                    onChange={this.handleOverrideWith}>
                    {
                      gamePlayers.map(player => (
                        <MenuItem key={player.id} value={player.id} primaryText={player.firstName + ' ' + player.lastName} />
                      ))
                    }
                  </DropDownMenu>
                  <RaisedButton
                    label="Confirm"
                    primary={true}
                    disabled={!this.state.overrideId1 || !this.state.overrideId2}
                    onTouchTap={this.handleOverrideConfirm}
                  />
                </Popover>
            </div>
          }
          subtitle={titleText}
        />
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

  render() {
    return (
      <Tabs>
        <Tab icon={<ActionBuild />} label="Setup">
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
        <Tab icon={<ActionQueryBuilder />}
          label={<span>Matches {this.props.timeLeft ? <MatchTimer timeLeft={this.props.timeLeft} /> : null}</span>}>
          { this.props.games.length ? (
            <div style={{ padding: 20, width: 250, float: 'left' }}>
              <Subheader>Queue</Subheader>
                { this.props.queue.length ? (
                    <List disabled={true}>
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
                ) : (<p>Queue is currently empty</p>) }
            </div>
          ) : null }
          { this.props.games.length ? (
            <div style={{ padding: 20, overflow: 'hidden' }}>
              <Subheader>Courts</Subheader>
              {this.props.games.map(game => this.renderCourt(game))}
            </div>
          ) : (
            <div style={{ padding: 20, overflow: 'hidden' }}>
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
    games: state.match.games,
    queue: state.match.queue,
    timeLeft: state.match.timeLeft
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startSession: () => {
      dispatch(createSessionAsync());
    },
    endSession: () => {
      dispatch(finishSession());
    },
    checkinUser: (user) => {
      dispatch(checkInUserAsync(user.id));
    },
    checkoutUser: (id) => {
      dispatch(checkOutUserAsync(id));
    },
    beginMatchmaking: (users) => {
      dispatch(startMatchmaking(users));
    },
    overrideMatch: (playerId1, playerId2) => {
      dispatch(overrideMatch(playerId1, playerId2));
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
