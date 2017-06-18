import React from 'react';
import { CirclePicker } from 'react-color';
import {connect} from 'react-redux';
import {toFeed, newNick, newPW, retypePW, confirmPW, changeProfile, getnewTheme, defaultTheme} from '../../actions';
import TopBar from '../TopBar';

class ProfileMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleToFeed = this.handleToFeed.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.handleUpdateNick = this.handleUpdateNick.bind(this);
    this.handleUpdatePW = this.handleUpdatePW.bind(this);
    this.handleUpdateRetypePW = this.handleUpdateRetypePW.bind(this);

    this.handleUpdateConfirmPW = this.handleUpdateConfirmPW.bind(this);
    this.handleDefaultTheme = this.handleDefaultTheme.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
  }
  componentDidMount() {
    this.props.onUpdateNick();
  }

  handleToFeed() {
    this.props.toFeed();
  }

  handleChangeTheme(color) {
    this.props.onUpdateTheme(color.hex);
  }

  handleUpdateNick(e) {
    this.props.onUpdateNick(e.target.value);
  }
  handleUpdatePW(e) {
    this.props.onUpdatePW(e.target.value);
  }
  handleUpdateRetypePW(e) {
    this.props.onUpdateRetypePW(e.target.value);
  }

  handleUpdateConfirmPW(e) {
    this.props.onUpdateConfirmPW(e.target.value);
  }
  handleKeyPress(e) {
    if(e.key === 'Enter')
      this.handleToFeed();
  }

  handleDefaultTheme(e) {
    this.props.onUpdateDefaultTheme(e.target.checked);
  }

  handleChangeProfile() {
    //order : newNick, newPW, retypePW
    let changeNick = (this.props.newNick !== undefined && this.props.newNick !== null)
      ? this.props.newNick : this.props.nickname;
    let changeTheme = (this.props.newNick === '') ? this.props.theme : this.props.newTheme;

    if(this.props.confirmPW === this.props.PW && this.props.confirmPW !==null){
      this.props.changeProfile(
      changeNick,
      this.props.newPW,
      this.props.retypePW,
      changeTheme
      );
      this.handleToFeed();
    }
  }

  render() {
    return (
      <div id="main-wrapper">
        <TopBar/>
        <div id="main-content" className={'main-content-color'} style={{backgroundColor:this.props.theme}}>
          <div id="Pagename">
            { this.props.username + '\'s Profile'}
          </div>
          <div className="line">
            <div id="nickname">Nickname</div>
            <input type="text" id="input-nickname" defaultValue={this.props.nickname} onChange={this.handleUpdateNick}/>
          </div>
          <div className="line">
              <div id="password">New Password</div>
              <input type="password" id="input-password" onChange={this.handleUpdatePW}/>
          </div>
          <div className="line">
            <div id="retypepassword">Retype New Password: </div>
            <input type="password" id="input-retypepassword" onChange={this.handleUpdateRetypePW}/>
          </div>
          <div className="line-thick">
            <div id="password">Password  <font color="red">*</font> </div>
            <input type="password" id="input-password" onChange={this.handleUpdateConfirmPW} onKeyPress={this.handleKeyPress}/>
          </div>
          <div className="line-thick">
            <div id="picker">Color theme</div>
            <div id="picker-wrapper">
              <CirclePicker 
                width="100%" 
                onChange= {this.handleChangeTheme}/>
            </div>
          </div>
          <div className="line">
            <input type="checkbox"
              onChange={this.handleDefaultTheme}
              checked={this.props.isDefaultTheme}/>
            <div>   : use default theme</div>
          </div>
          <div className="line">
            <button id="change-password" className="changeButtons" onClick={this.handleChangeProfile}>Confirm</button>
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
    PW: state.server.PW,
    theme: state.server.theme,
    isDefaultTheme: state.server.isDefaultTheme,

    newNick: state.server.newNick,
    newPW: state.server.newPW,
    retypePW: state.server.retypePW,
    confirmPW: state.server.confirmPW,
    newTheme: state.server.newTheme,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    toFeed: () => dispatch(toFeed()),

    onUpdateNick: (value) => dispatch(newNick(value)),
    onUpdatePW: (value) => dispatch(newPW(value)),
    onUpdateRetypePW: (value) => dispatch(retypePW(value)),

    onUpdateConfirmPW: (value) => dispatch(confirmPW(value)),
    onUpdateTheme: (color) => dispatch(getnewTheme(color)),
    onUpdateDefaultTheme: (check) => dispatch(defaultTheme(check)),
    changeProfile: (newNick, newPW, retypePW, newTheme) =>
      dispatch(changeProfile(newNick, newPW, retypePW, newTheme)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
