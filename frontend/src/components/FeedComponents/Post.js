import React from 'react';
import Sound from 'react-sound';
import {connect} from 'react-redux';
import {postFeed, startSound, endSound} from '../../actions';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.handlePostFeed = this.handlePostFeed.bind(this);
    this.handleEndSound = this.handleEndSound.bind(this);
  }
  
  handlePostFeed() {
    let contents = document.getElementById('newFeed-text');
    const scope = document.getElementById('newFeed-scope').value;
    this.props.postFeed(contents.value, scope);
    this.props.startSound('feedpost.mp3');
    contents.value = '';
  }

  handleEndSound() {
    this.props.endSound();
  }

  postSound() {
    if(this.props.soundStart)
    {
      return (
        <Sound
          url={this.props.url}
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={this.handleEndSound}
        />
      );
    }
    else
    {
      return (<div></div>);
    }
  }

  render() {
    return (
      <div id="newFeed-wrapper">
        <div id="newFeed-title">
          <div id="newFeed-name">
            New Feed
          </div>
          <select name="scope" id="newFeed-scope">
            <option value="Public">Public</option>
            <option value="Friends Only">Friends Only</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div id="newFeed-text-wrapper">
          <textarea id="newFeed-text">CONTEXT</textarea>
        </div>
        <div id="newFeed-functions">
          <button id="newFeed-post" onClick={this.handlePostFeed}>
            POST
          </button>
        </div>
        { this.postSound() }
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    soundStart : state.server.soundStart,
    url : state.server.url
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    postFeed: (contents, scope) => dispatch(postFeed(contents, scope)),
    startSound: (url) => dispatch(startSound(url)),
    endSound: () => dispatch(endSound())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
