import React from 'react';
import {connect} from 'react-redux';
import {toFeed, getProfile, /*changeNick, changePW*/ setNick, setPW} from '../../actions';
import TopBar from '../TopBar';

class ProfileMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleToFeed = this.handleToFeed.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChangeNick = this.handleChangeNick.bind(this);
    this.handleChangePW = this.handleChangePW.bind(this);
  }
  componentDidMount() {
    this.props.getProfile();
  }

  handleToFeed() {
    this.props.toFeed();
  }
  handleKeyPress(e) {
    if(e.key === 'Enter')
      this.handlePostChat();
  }

  handleChangeNick() {
    this.props.changeNick();
  }
  handleChangePW() {
    this.props.changePW();
  }

  render() {
    let pagenameStr = this.props.username + '(Nickname: ' + this.props.nickname + ')\'s Profile';
    return (
      <div id="main-wrapper">
        <TopBar/>
        <div id="main-content">
          <div id="Pagename">
            {pagenameStr}
          </div>
          <div className="line">
            <div id="password">Password: </div>
            <input type="password" id="input-password"/>
          </div>
          <div className="line">
            <div id="nickname">Nickname: </div>
            <input type="text" id="input-nickname" defaultValue={this.props.nickname} />
            <button id="change-nickname" className="loginButtons" onClick={this.handleChangeNick}>Change Nickname</button>
          </div>
          <div className="line">
            <div>
              <div id="password">New Password: </div>
              <input type="password" id="input-password"/>
            </div>
            <div>
              <div id="retypepassword">Retype New Password: </div>
              <input type="password" id="input-retypepassword"/>
            </div>
            <button id="change-password" className="loginButtons" onClick={this.handleChangePW}>Change Password</button>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    username: state.server.ID,
    nickname: state.server.Nick,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    toFeed: () => dispatch(toFeed()),
    getProfile: () => dispatch(getProfile()),
    changeNick: (newNick) => dispatch(setPW(newNick)),
    changePW: (newPW) => dispatch(setNick(newPW)),
//    changeNick: (newNick) => dispatch(changeNick(newNick)),
//    changePW: (newPW) => dispatch(changeNick(newPW)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
