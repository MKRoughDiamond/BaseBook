import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {toTimeline} from '../actions';
import TimelineMain from './TimelineComponents/Main';

class Timeline extends React.Component {
  componentDidMount() {
    this.props.toTimeline(this.props.params.username);
  }

  render() {
    if (this.props.isLoggedIn) {
      if (this.props.onTimeline) {
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
    isLoggedIn : state.server.loggedIn
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    toTimeline: (username) => dispatch(toTimeline(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
