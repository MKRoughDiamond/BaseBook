import React from 'react';
import {connect} from 'react-redux';
import {getFeed, postLikes, postDislikes, getLikes, getDislikes, toTimeline} from '../../actions';
import ReplyPost from './ReplyPost';
import ReplyEntry from './ReplyEntry';
class Entry extends React.Component {
  constructor(props) {
    super(props);

    this.handlePostLikes = this.handlePostLikes.bind(this);
    this.handlePostDislikes = this.handlePostDislikes.bind(this);
    this.handleToTimeline = this.handleToTimeline.bind(this);
  }

  componentDidMount() {
    const feed = this.props.feedList[this.props.feedID];
    if(feed.contents === null) {
      this.props.getFeed(this.props.feedID);
      this.props.getLikes(this.props.feedID);
      this.props.getDislikes(this.props.feedID);
    }
  }

  handlePostLikes() {
    const id = this.props.feedID;
    this.props.postLikes(id);
  }

  handlePostDislikes() {
    const id = this.props.feedID;
    this.props.postDislikes(id);
  }

  handleToTimeline() {
    const username = this.props.feedList[this.props.feedID].author;
    this.props.toTimeline(username);
  }

  render() {
    const feed = this.props.feedList[this.props.feedID];
    if(feed.contents === null)
      return <div/>;
    return (
      <div className="feed-wrapper">
        <div className="feed-title">
          <div className="feed-writer" onClick={this.handleToTimeline}>
            {feed.author}
          </div>
          <button className="feed-delete" id={'feed'+this.props.feedID+'-delete'}>
            delete
          </button>
          <button className="feed-modify" id={'feed'+this.props.feedID+'-modify'}>
            modify
          </button>
          <button className="feed-dislike" id={'feed'+this.props.feedID+'-dislike'} onClick={this.handlePostDislikes}>
            {'Dislike ' + feed.dislike}
          </button>
          <button className="feed-like" id={'feed'+this.props.feedID+'-like'} onClick={this.handlePostLikes}>
            {'Like ' + feed.like}
          </button>
        </div>
        <div className="feed-content" id={'feed'+this.props.feedID+'-content'}>
          {feed.contents}
        </div>
        <div id="reply-wrapper">
          <ReplyPost/>
          {feed.orderedReplyIdList.map( (id) => {
            return (
              <ReplyEntry
                feedID={this.props.feedID}
                replyID={id}
                key={this.props.feedID.toString() + '_' + id.toString()}
              />);
          })}
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
    getFeed: (id) => dispatch(getFeed(id)),
    postLikes: (id) => dispatch(postLikes(id)),
    postDislikes: (id) => dispatch(postDislikes(id)),
    getLikes: (id) => dispatch(getLikes(id)),
    getDislikes: (id) => dispatch(getDislikes(id)),
    toTimeline: (username) => dispatch(toTimeline(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
