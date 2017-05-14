import { SET_FEED_LIST, SET_FEED , SET_LIKES, SET_DISLIKES} from '../actions';

const initState = {
  desiredFeedCount: 0,
  feedList: {}
};

const feedInitState = {
  author: null,
  contents: null,
  like: null,
  dislike: null,
  scope: null,
  didLike: null,
  didDislike: null
};

const feed = (state = initState, action) => {
  switch(action.type) {
  case SET_FEED_LIST: {
    // copy existing feed to prevent redundant GET requests 
    let newFeedList = {};
    action.list.map((id) => {
      console.log('set_feed_list id: ',id);
      const sid = id.toString();
      if(sid in state.feedList)
        newFeedList[sid] = state.feedList[sid]; 
      else
        newFeedList[sid] = Object.assign({}, feedInitState);
    });
    return Object.assign({}, state, { feedList : newFeedList });
  }
  case SET_FEED: {
    let newFeed = {};
    if(action.id in state.feedList) {
      newFeed = Object.assign({}, state.feedList[action.id],
        {
          author: action.feed.author,
          contents: action.feed.contents,
          scope: action.feed.scope
        });
    }
    else {
      newFeed = Object.assign({}, feedInitState, {
        author: action.feed.author,
        contents: action.feed.contents,
        scope: action.feed.scope
      });
    }
    let newFeedList = Object.assign({}, state.feedList);
    newFeedList[action.id] = newFeed;
    return Object.assign({}, state, { feedList : newFeedList });
  }
  case SET_LIKES: {
    let newFeed = {};
    const likes = action.likes.length;
    if(action.id in state.feedList) {
      newFeed = Object.assign({}, state.feedList[action.id],
        {
          like: likes,
          didLike: action.didLike
        });
    }
    else {
      newFeed = Object.assign({}, feedInitState, {
        like: likes,
        didLike: action.didLike
      });
    }
    let newFeedList = Object.assign({}, state.feedList);
    newFeedList[action.id] = newFeed;
    return Object.assign({}, state, { feedList : newFeedList });
  }
  case SET_DISLIKES: {
    let newFeed = {};
    const dislikes = action.dislikes.length;
    if(action.id in state.feedList) {
      newFeed = Object.assign({}, state.feedList[action.id],
        {
          dislike: dislikes,
          didDislike: action.didDislike
        });
    }
    else {
      newFeed = Object.assign({}, feedInitState, {
        dislike: dislikes,
        didDislike: action.didDislike
      });
    }
    let newFeedList = Object.assign({}, state.feedList);
    newFeedList[action.id] = newFeed;
    return Object.assign({}, state, { feedList: newFeedList });
  }
  default:
    return state;
  }
};

export default feed;
