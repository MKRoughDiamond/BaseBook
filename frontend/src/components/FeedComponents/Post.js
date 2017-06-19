import React from 'react';
import {connect} from 'react-redux';
import {postFeed, startSound, newFeedType} from '../../actions';
//import PostContent from './PostContent';
import ContactForm from '../Image';
//import ImagePost from './ImagePost';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostFeed = this.handlePostFeed.bind(this);
    this.handleUpdateNewFeedType = this.handleUpdateNewFeedType.bind(this);
  }
  handleUpdateNewFeedType(e) {
    console.log('asdfasdfadsf');
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
    //let type = document.getElementById('newFeed-feedtype');
    let type = this.props.newFeedType;
    console.log('feedtype: ',type);
    /*if(type === null)
      type = 'Text';
    else
      type = feedtype.value;*/
    let message='You selected '+this.props.newFeedType;
    if(type === 'ImagePost'){
      return (
        <div id="newFeed-wrapper">
          <div id="newFeed-title">
            <div id="newFeed-name">
              New Feed
            </div>
            <select name="feedtype" id="newFeed-feedtype" onChange={this.handleChangeNewFeedType}>
              <option value="Text">Text</option>
              <option value="Markdown">Markdown</option>
              <option value="ImagePost">ImagePost</option>
            </select>
            <select name="scope" id="newFeed-scope">
              <option value="Public">Public</option>
              <option value="Friends Only">Friends Only</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <ContactForm/>
          <p>{message}</p>
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
            <select name="feedtype" id="newFeed-feedtype" onChange={this.props.handleUpdateNewFeedType}>
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

          <p>{message}</p>
        </div>
      );
    }
  }
}

let mapStateToProps = (state) => {
  return {
    newFeedText: state.server.newFeedText,
    newFeedType: state.server.newFeedType,
    newFeedScope: state.server.newFeedScope,
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
