import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import Main from './FeedComponents/Main';

class Feed extends React.Component {
  render() {
    return (this.props.isLoggedIn)?(
      <Main/>
    ):(
      <Redirect to="/login/"/>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLoggedIn : state.server.loggedIn
  };
};

export default connect(mapStateToProps)(Feed);
