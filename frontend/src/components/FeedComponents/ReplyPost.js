import React from 'react';
import {connect} from 'react-redux';
import {postReply} from '../../actions';

class ReplyPost extends React.Component {
  constructor(props) {
    super(props);

    this.handlePostReply = this.handlePostReply.bind(this);
  }
  
  handlePostFeed() {
    const contents = document.getElementById('newFeed-text').value;
    // POST하고 썼던 글이 초기화가 안됨 변경바람
    this.props.postReply(feedId, contents);
  }

  render() {
    return (
      <div id="newReply">
        <div id="newReply-title">
          reply
        </div>
        <div id="newReply-text-wrapper">
          <textarea id="newReply-text"></textarea>
        </div>
        <button id="newReply-post" onClick={this.handlePostReply}>
          POST
        </button>
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    postFeed: (feedId, contents) => dispatch(postFeed(feedId, contents))
  };
};

export default connect(null, mapDispatchToProps)(ReplyPost);
