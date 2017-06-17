import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {toTimeline} from '../actions';
import TimelineMain from './TimelineComponents/Main';

class Timeline extends React.Component {
  componentDidMount() {
    this.props.toTimeline(this.props.match.params.username);
  }

  render() {
    console.log('onProfile:', this.props.onProfile);
    if (this.props.isLoggedIn) {
      if (this.props.onTimeline) {
        const urlUsername = this.props.match.params.username;
        if (this.props.timelineUser !== urlUsername) {
          const Url = '/timeline/' + this.props.timelineUser;
          return (
            <Redirect to={Url} />
          );
        }
        return (
          <TimelineMain/>
        );
      }
      return (
        <Redirect to="/"/>
      );
    }

    return (
      <Redirect to="/login/"/>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    onTimeline : state.server.onTimeline,
    isLoggedIn : state.server.loggedIn,
    timelineUser : state.server.timelineUser
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    toTimeline: (username) => dispatch(toTimeline(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
