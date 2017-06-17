import React from 'react';
import Sound from 'react-sound';
import {connect} from 'react-redux';
import {endSound} from '../actions';
import soundManager from 'soundmanager2';

soundManager.soundManager.audioFormats.mp3.required = false;
soundManager.soundManager.audioFormats.ogg.required = true;

class SoundManager extends React.Component {
  constructor(props) {
    super(props);

    this.handlesoundEnd = this.handleSoundEnd.bind(this);
  }
  
  handleSoundEnd() {
    this.props.endSound();
  }
  render() {
    if(this.props.soundStart) {
      return (<Sound
        url={this.props.soundUrl}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={this.handlesoundEnd}
      />);
    }
    else
    {
      return (<div></div>);
    }
  }
}

let mapStateToProps = (state) => {
  return {
    soundUrl : state.server.soundUrl,
    soundStart : state.server.soundStart
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    endSound: () => dispatch(endSound())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundManager);
