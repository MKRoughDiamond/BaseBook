import { SET_FEED_LIST } from '../actions';

const initState = {
  desiredFeedCount: 0,
  feedList: {}
};

const feedInitState = {
  contents: null,
  like: null,
  dislike: null,
  scope: null
};

const feed = (state = initState, action) => {
  switch(action.type) {
  case SET_FEED_LIST: {
    // copy existing feed to prevent redundant GET requests 
    let newFeedList = {};
    action.list.map((id) => {
      const sid = id.toString();
      if(sid in state.feedList)
        newFeedList[sid] = state.feedList[sid]; 
      else
        newFeedList[sid] = Object.assign({}, feedInitState);
    });
    return Object.assign({}, state, { feedList : newFeedList });
  }
  default:
    return state;
  }
};

export default feed;
