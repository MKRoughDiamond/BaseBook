import React from 'react';
import {connect} from 'react-redux';
import { toFeed, toTimeline, userQuery, getUserList, logout, startSound } from '../actions';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleToFeed = this.handleToFeed.bind(this);
    this.handleToTimeline = this.handleToTimeline.bind(this);
    this.handleUserQuery = this.handleUserQuery.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if(this.props.userList === null) {
      this.props.getUserList();
    }
  }

  handleToFeed() {
    this.props.toFeed();
    this.props.startSound('tomain');
  }

  handleToTimeline(username) {
    this.refs.query.value = '';
    this.props.userQuery('');
    this.props.toTimeline(username);
  }

  handleUserQuery() {
    this.props.userQuery(this.refs.query.value);
  }

  handleLogout() {
    this.props.startSound('logout');
    this.props.logout();
  }

  render() {
    return (
      <div id="main-title">
        <div id="main-title-name" onClick={this.handleToFeed}>
          BaseBook
        </div>
        <div id="logout" onClick={this.handleLogout}>
          logout
        </div>
        <div id="find-people">
          <div id="find-people-title">
            Find other people :
          </div>
          <input id="find-people-search" ref="query" onChange={this.handleUserQuery}/>
          <div id="find-people-result-wrapper">
            {this.props.queriedUser.map( (username) => {
              return (
                <div className="find-people-entry">
                  <button className="find-people-totimeline"
                    id={'totimeline'+username}
                    onClick={() => {this.handleToTimeline(username);}}
                  >
                    {username}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    queriedUser: state.userSearch.queriedUser,
    userList: state.userSearch.userList
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    toFeed: () => dispatch(toFeed()),
    toTimeline: (username) => dispatch(toTimeline(username)),
    userQuery: (keyword) => dispatch(userQuery(keyword)),
    getUserList: () => dispatch(getUserList()),
    logout: () => dispatch(logout()),
    startSound: (url) => dispatch(startSound(url))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
