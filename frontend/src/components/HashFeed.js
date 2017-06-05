import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {toHashFeed} from '../actions';
import HashFeedMain from './HashFeedComponents/Main';

class HashFeed extends React.Component {
  componentDidMount() {
    this.props.toHashFeed(this.props.match.params.tagname);
  }

  render() {
    if (this.props.isLoggedIn) {
      if (this.props.onHashFeed) {
        const urlTagname = this.props.match.params.tagname;
        if (this.props.tagname !== urlTagname) {
          const Url = '/hashtag/' + this.props.tagname;
          return (
            <Redirect to={Url} />
          );
        }
        return (
          <HashFeedMain/>
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
    isLoggedIn : state.server.loggedIn,
    onHashFeed : state.server.onHashFeed,
    tagname: state.server.tagname
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    toHashFeed: (tagname) => dispatch(toHashFeed(tagname))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HashFeed);
