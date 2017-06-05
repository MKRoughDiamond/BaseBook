import React from 'react';
import {connect} from 'react-redux';
import {postFeed, startSound} from '../../actions';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.handlePostFeed = this.handlePostFeed.bind(this);
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
    return (
      <div id="newFeed-wrapper">
        <div id="newFeed-title">
          <div id="newFeed-name">
            New Feed
          </div>
          <select name="feedtype" id="newFeed-feedtype">
            <option value="Text">Text</option>
            <option value="Markdown">Markdown</option>
          </select>
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
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    postFeed: (contents, scope, feedtype) => dispatch(postFeed(contents, scope, feedtype)),
    startSound: (url) => dispatch(startSound(url)),
  };
};

export default connect(null, mapDispatchToProps)(Post);
