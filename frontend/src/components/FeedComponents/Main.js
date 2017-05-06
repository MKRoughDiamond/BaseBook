import React from 'react';
import {connect} from 'react-redux';
import {getFeedList} from '../../actions';

class Main extends React.Component {
  componentDidMount() {
    this.props.getFeedList();
  }
  
  render() {
    return (
      <div id="feed-entries">
        {this.props.feedList.map( (feed, i) => {
          return <Entry feedID={feed.id} index={i}/>;
        })}
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
