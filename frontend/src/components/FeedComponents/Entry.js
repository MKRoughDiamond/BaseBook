import React from 'react';
import {connect} from 'react-redux';
import {getFeed, postLikes, postDislikes, getLikes, getDislikes} from '../../actions';

class Entry extends React.Component {
  constructor(props) {
    super(props);

    this.handlePostLikes = this.handlePostLikes.bind(this);
    this.handlePostDislikes = this.handlePostDislikes.bind(this);
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

  render() {
    const feed = this.props.feedList[this.props.feedID];
    if(feed.contents === null)
      return <div/>;
    return (
      <div id="feed-wrapper">
        <div id="feed-title">
          <div id="feed-writer">
            {feed.author}
          </div>
          <button id="feed-delete">
            delete
          </button>
          <button id="feed-modify">
            modify
          </button>
          <button id="feed-bad" onClick={this.handlePostDislikes}>
            {'Bad ' + feed.dislike}
          </button>
          <button id="feed-good" onClick={this.handlePostLikes}>
            {'Good ' + feed.like}
          </button>
        </div>
        <div id="feed-content">
          {feed.contents}
        </div>
      </div>
    );  // TODO: add reply
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
    getDislikes: (id) => dispatch(getDislikes(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
