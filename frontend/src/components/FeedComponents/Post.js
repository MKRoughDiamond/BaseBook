import React from 'react';
import {connect} from 'react-redux';
import {postFeed, startSound, newFeedType} from '../../actions';
import ContactForm from '../Image';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostFeed = this.handlePostFeed.bind(this);
    this.handleUpdateNewFeedType = this.handleUpdateNewFeedType.bind(this);
  }
  handleUpdateNewFeedType(e) {
    this.props.onUpdateNewFeedType(e.target.value);
  }
  handlePostFeed() {
    let contents = document.getElementById('newFeed-text');
    const scope = document.getElementById('newFeed-scope').value;
    const feedtype = document.getElementById('newFeed-feedtype').value;
    this.props.postFeed(contents.value, scope, feedtype);
    this.props.startSound('feedpost');
    contents.value = '';
  }

  render() {
    let type = this.props.newFeedType;
    if(type === 'ImagePost'){
      return (
        <div id="newFeed-wrapper">
          <div id="newFeed-title">
            <div id="newFeed-name">
              New Feed
            </div>
            <select name="feedtype" id="newFeed-feedtype" onChange={this.handleUpdateNewFeedType}>
              <option value="Text">Text</option>
              <option value="Markdown">Markdown</option>
              <option value="ImagePost">Image Post</option>
            </select>
            <select name="scope" id="newFeed-scope">
              <option value="Public">Public</option>
              <option value="Friends Only">Friends Only</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <ContactForm/>
        </div>
      );
    }
    else {
      return (
        <div id="newFeed-wrapper">
          <div id="newFeed-title">
            <div id="newFeed-name">
              New Feed
            </div>
            <select name="feedtype" id="newFeed-feedtype" onChange={this.handleUpdateNewFeedType}>
              <option value="Text">Text</option>
              <option value="Markdown">Markdown</option>
              <option value="ImagePost">Image Post</option>
            </select>
            <select name="scope" id="newFeed-scope">
              <option value="Public">Public</option>
              <option value="Friends Only">Friends Only</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div id="newFeed-text-wrapper">
            <textarea id="newFeed-text" placeholder="How do you feel today?"/>
          </div>
          <div id="newFeed-functions">
            <button id="newFeed-post" onClick={this.handlePostFeed}>
              POST
            </button>
          </div>
        </div>
      );
    }
  }
}

let mapStateToProps = (state) => {
  return {
    newFeedType: state.server.newFeedType,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    postFeed: (contents, scope, feedtype) => dispatch(postFeed(contents, scope, feedtype)),
    startSound: (url) => dispatch(startSound(url)),
    onUpdateNewFeedType: (value) => dispatch(newFeedType(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
