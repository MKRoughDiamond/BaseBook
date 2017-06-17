import React from 'react';
import {connect} from 'react-redux';
import {toFeed, newNick, newPW, retypePW, confirmPW, changeProfile} from '../../actions';
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
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
  }
  componentDidMount() {
    this.props.onUpdateNick();
  }

  handleToFeed() {
    this.props.toFeed();
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
  handleChangeProfile() {
    //order : newNick, newPW, retypePW
    console.log(this.props.newNick);
    if(this.props.newNick !== undefined && this.props.newNick !== null)
    {
      if(this.props.confirmPW === this.props.PW && this.props.confirmPW !==null){
        this.props.changeProfile(
        this.props.newNick,
        this.props.newPW,
        this.props.retypePW
        );
        this.handleToFeed();
      }
    }else{
      if(this.props.confirmPW === this.props.PW && this.props.confirmPW !==null){
        this.props.changeProfile(
          this.props.nickname,
          this.props.newPW,
          this.props.retypePW
        );
        this.handleToFeed();
      }
    }
  }

  render() {
    return (
      <div id="main-wrapper">
        <TopBar/>
        <div id="main-content">
          <div id="Pagename">
            { this.props.username + '\'s Profile'}
          </div>
          <div className="line">
            <div id="nickname">Nickname: </div>
            <input type="text" id="input-nickname" defaultValue={this.props.nickname} onChange={this.handleUpdateNick}/>
          </div>
          <div className="line">
            <div>
              <div id="password">New Password: </div>
              <input type="password" id="input-password" onChange={this.handleUpdatePW}/>
            </div>
            <div>
              <div id="retypepassword">Retype New Password: </div>
              <input type="password" id="input-retypepassword" onChange={this.handleUpdateRetypePW}/>
            </div>
          </div>
          <div className="line">
            <div id="password">Password: </div>
            <input type="password" id="input-password" onChange={this.handleUpdateConfirmPW} onKeyPress={this.handleKeyPress}/>
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

    newNick: state.server.newNick,
    newPW: state.server.newPW,
    retypePW: state.server.retypePW,
    confirmPW: state.server.confirmPW,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    toFeed: () => dispatch(toFeed()),

    onUpdateNick: (value) => dispatch(newNick(value)),
    onUpdatePW: (value) => dispatch(newPW(value)),
    onUpdateRetypePW: (value) => dispatch(retypePW(value)),

    onUpdateConfirmPW: (value) => dispatch(confirmPW(value)),
    changeProfile: (newNick, newPW, retypePW) =>
      dispatch(changeProfile(newNick, newPW, retypePW)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
