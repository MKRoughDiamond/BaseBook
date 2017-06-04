import { SET_FEED_LIST, SET_FEED , SET_LIKES, SET_DISLIKES, SET_REPLY_LIST, SET_REPLY, LOGOUT } from '../actions';

const initState = {
  desiredFeedCount: 0,
  feedList: {},
  orderedFeedIdList: []
};

const feedInitState = {
  author: null,
  contents: null,
  like: null,
  dislike: null,
  scope: null,
  didLike: null,
  didDislike: null,
  replyList: {},
  orderedReplyIdList: []
};

const replyInitState = {
  author: null,
  contents: null
};

const feed = (state = initState, action) => {
  switch(action.type) {
  case LOGOUT:
    return initState;
  case SET_FEED_LIST: {
    // copy existing feed to prevent redundant GET requests 
    let newFeedList = {};
    action.list.map((id) => {
      const sid = id.toString();
      if(sid in state.feedList)
        newFeedList[sid] = state.feedList[sid]; 
      else
        newFeedList[sid] = Object.assign({}, feedInitState, {
          like: 0,
          dislike: 0
        });
    });
    return Object.assign({}, state, {
      feedList : newFeedList,
      orderedFeedIdList: action.list
    });
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
        scope: action.feed.scope,
        like: 0,
        dislike: 0
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
  case SET_REPLY_LIST: {
    // copy existing reply to prevent redundant GET requests 
    let newReplyList = {};
    action.list.map((id) => {
      const sid = id.toString();
      const replyList = state.feedList[action.feedId].replyList;
      if(sid in replyList)
        newReplyList[sid] = replyList[sid]; 
      else
        newReplyList[sid] = Object.assign({}, replyInitState, {});
    });
    let newFeedList = Object.assign({}, state.feedList, {});
    newFeedList[action.feedId].replyList = newReplyList;
    newFeedList[action.feedId].orderedReplyIdList = action.list;
    return Object.assign({}, state, {
      feedList : newFeedList,
    });
  }
  case SET_REPLY: {
    let newReply = {};
    let replyList = state.feedList[action.feedId].replyList;
    if(action.id in replyList) {
      newReply = Object.assign({}, replyList[action.replyId],
        {
          author: action.reply.author,
          contents: action.reply.contents,
        });
    }
    else {
      newReply = Object.assign({}, replyInitState, {
        author: action.reply.author,
        contents: action.reply.contents,
      });
    }
    let newReplyList = Object.assign({}, replyList);
    newReplyList[action.replyId] = newReply;
    let newFeedList = Object.assign({}, state.feedList);
    newFeedList[action.feedId].replyList = newReplyList;
    return Object.assign({}, state, { feedList : newFeedList });
  }
  default:
    return state;
  }
};

export default feed;
