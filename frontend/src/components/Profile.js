import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import Main from './ProfileComponents/Main';

class Profile extends React.Component {
  render() {
    return (this.props.isLoggedIn)?(
      (this.props.onProfile)?(
        <Main />
      ):(
        <Redirect to="/" />)
    ):(
      <Redirect to="/login/"/>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLoggedIn : state.server.loggedIn,
    onProfile : state.server.onProfile
  };
};

export default connect(mapStateToProps)(Profile);
