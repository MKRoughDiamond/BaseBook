import React from 'react';
import {connect} from 'react-redux';
import {postFeed} from '../../actions';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.handlePostFeed = this.handlePostFeed.bind(this);
  }
  
  handlePostFeed() {
    const contents = document.getElementById('newFeed-text').value;
    const scope = document.getElementById('newFeed-scope').value;
    // POST하고 썼던 글이 초기화가 안됨 변경바람
    this.props.postFeed(contents, scope);
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
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    postFeed: (contents, scope) => dispatch(postFeed(contents, scope))
  };
};

export default connect(null, mapDispatchToProps)(Post);
