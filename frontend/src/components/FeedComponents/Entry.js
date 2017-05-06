import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

class Entry extends React.Component {
  render() {
    return <div/>;
  }
}

let mapStateToProps = (state) => {
  return {
    feedList: state.feed.feedList
  };
};

export default connect(mapStateToProps)(Entry);
