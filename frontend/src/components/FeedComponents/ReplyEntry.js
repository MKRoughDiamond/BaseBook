import React from 'react';
import {connect} from 'react-redux';
import {getReply, toTimeline} from '../../actions';

class ReplyEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleToTimeline = this.handleToTimeline.bind(this);
  }

  componentDidMount() {
    const reply = this.props.feedList[this.props.feedID].replyList[this.props.replyID];
    if(reply.contents === null) {
      this.props.getReply(this.props.feedID, this.props.replyID);
    }
  }

  handleToTimeline() {
    const username = this.props.feedList[this.props.feedID]
      .replyList[this.props.replyID].author;
    this.props.toTimeline(username);
  }

  render() {
    const reply = this.props.feedList[this.props.feedID].replyList[this.props.replyID];
    if(reply.contents === null)
      return <div/>;
    return (
      <div id="reply">
        <div id="reply-writer">
          {reply.author}
        </div>
        <button id="reply-remove">
          ×
        </button>
        <div id="reply-content">
          {reply.contents}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    feedList: state.feed.feedList
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getReply: (feedId, replyId) => dispatch(getReply(feedId, replyId)),
    toTimeline: (username) => dispatch(toTimeline(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyEntry);
