import React from 'react';
import {connect} from 'react-redux';
import {getFeedList, toChat} from '../../actions';
import Entry from './Entry';
import Post from './Post';

class Main extends React.Component {
  componentDidMount() {
    this.props.getFeedList();
  }
  handleToChat() {
    this.props.toChat();
  }

  render() {
    const feedList = this.props.feedList;
    console.log(Object.keys(feedList));
    return (
      <div id="main-wrapper">
        <div id="main-title">
          <div id="main-title-name">
            BaseBook
          </div>
          <div id="logout">
            logout
          </div>
        </div>
        <div id="main-content">
          <div id="Pagename">
            MK_RD's Page
            <button id="chat_button" onClick={this.handleToChat}>
              Chat
            </button>
          </div>
          <Post/>
          <div id="feed-entries">
            {Object.keys(feedList).map( (id, i) => {
              return <Entry feedID={id} index={i}/>;
            })}
          </div>
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
    getFeedList: () => dispatch(getFeedList()),
    toChat: () => dispatch(toChat())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);
