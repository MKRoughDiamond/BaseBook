import React from 'react';
import {connect} from 'react-redux';
import {getFeed} from '../../actions';

class Entry extends React.Component {
  componentDidMount() {
    if(this.props.feedList[this.props.feedID].contents === null)
      this.props.getFeed(this.props.feedID);
  }

  render() {
    const feed = this.props.feedList[this.props.feedID];
    if(feed.contents === null)
      return <div/>;
    return (
      <div id="feed-wrapper">
        <div id="feed-title">
          <div id="feed-writer">
            MK_RD
          </div>
          <button id="feed-delete">
            delete
          </button>
          <button id="feed-modify">
            modify
          </button>
          <button id="feed-bad">
            {'Bad ' + feed.dislike.toString()}
          </button>
          <button id="feed-good">
            {'Good ' + feed.like.toString()}
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
    getFeed: (id) => dispatch(getFeed(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
