import React from 'react';
import {connect} from 'react-redux';
import {getFeedList} from '../../actions';
import Entry from './Entry';
import Post from './Post';

class Main extends React.Component {
  componentDidMount() {
    this.props.getFeedList();
  }
  
  render() {
    const feedList = this.props.feedList;
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
          </div>
          <Post/>
          <div id="feed-entries">
            {Object.keys(feedList).map( (id, i) => {
              return(
                <div>
                  <Entry feedID={feedList[id].feed.id} index={i}/>
                </div>);
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
    getFeedList: () => dispatch(getFeedList())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);
