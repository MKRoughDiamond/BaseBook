import feed from '../src/reducers/feed';
import * as types from '../src/actions';

describe('feed reducer', ()=> {
  it('should return the initial state', ()=> {
    expect(
      feed(undefined, {})
    ).toEqual({
        desiredFeedCount: 0,
        feedList: {},
        orderedFeedIdList: []
      })
  })

  it('should handle LOGOUT', () => {
    expect (
      feed({}, { type: types.LOGOUT })
    ).toEqual({
      desiredFeedCount: 0,
      feedList: {},
      orderedFeedIdList: []
    })
  })

  it('should handle SET_FEED_LIST', () => {
    expect (
      feed(undefined, {
        type : types.SET_FEED_LIST,
        list : [3]
      })
    ).toEqual({
      desiredFeedCount : 0,
      feedList : {"3" : { 
        author: null,
        contents: null,
        like: 0,
        dislike: 0,
        scope: null,
        didLike: null,
        didDislike: null,
        replyList: {},
        orderedReplyIdList : [],
        feedtype: null
      }},
      orderedFeedIdList : [3]
    })
  })

  it('should handle SET_FEED', () => {
    expect (
      feed(undefined, {
        type : types.SET_FEED,
        feed : {
          author : 'asdf',
          contents : 'asdf',
          scope : 'public'
        },
        id : 3
      })
    ).toEqual({
      desiredFeedCount : 0,
      feedList : {"3" : {
        author : 'asdf',
        contents : 'asdf',
        like : 0,
        dislike : 0,
        scope : 'public',
        didLike : null,
        didDislike : null,
        replyList: {},
        orderedReplyIdList : [],
        feedtype: undefined
      }},
      orderedFeedIdList : []
    })
  })

  it('should handle SET_LIKES', () => {
    expect (
      feed(undefined, {
        type : types.SET_LIKES,
        id : 3,
        didLike : false,
        likes : [3]
      })
    ).toEqual({
      desiredFeedCount : 0,
      feedList : {"3" : { 
        author: null,
        contents: null,
        like: 1,
        dislike: null,
        scope: null,
        didLike: false,
        didDislike: null,
        replyList: {},
        orderedReplyIdList : [],
        feedtype: null
      }},
      orderedFeedIdList : []
    })
  })

  it('should handle SET_DISLIKES', () => {
    expect (
      feed(undefined, {
        type : types.SET_DISLIKES,
        id : 3,
        didDislike : false,
        dislikes : [3]
      })
    ).toEqual({
      desiredFeedCount : 0,
      feedList : {"3" : { 
        author: null,
        contents: null,
        like: null,
        dislike: 1,
        scope: null,
        didLike: null,
        didDislike: false,
        replyList: {},
        orderedReplyIdList : [],
        feedtype: null
      }},
      orderedFeedIdList : []
    })
  })

  it('should handle SET_REPLY_LIST', () => {
    expect (
      feed({
      desiredFeedCount : 0,
      feedList : {"3" : { 
        author: null,
        contents: null,
        like: 0,
        dislike: 0,
        scope: null,
        didLike: null,
        didDislike: null,
        replyList: {},
        orderedReplyIdList : []
      }},
      orderedFeedIdList : []
      }, {
        type : types.SET_REPLY_LIST,
        list : [3],
        feedId : 3
      })
    ).toEqual({
      desiredFeedCount : 0,
      feedList : {"3" : { 
        author: null,
        contents: null,
        like: 0,
        dislike: 0,
        scope: null,
        didLike: null,
        didDislike: null,
        replyList: {"3" : {
          author: null,
          contents: null
        }},
        orderedReplyIdList : [3]
      }},
      orderedFeedIdList : []
    })
  })

  it('should handle SET_REPLY', () => {
    expect (
      feed({
      desiredFeedCount : 0,
      feedList : {"3" : { 
        author: null,
        contents: null,
        like: 0,
        dislike: 0,
        scope: null,
        didLike: null,
        didDislike: null,
        replyList: {},
        orderedReplyIdList : []
      }},
      orderedFeedIdList : []
      }, {
        type : types.SET_REPLY,
        feedId : 3,
        id : 3,
        replyId : 3,
        reply : {
          author : 'asdf',
          contents : 'asdf'
        },
      })
    ).toEqual({
      desiredFeedCount : 0,
      feedList : {"3" : { 
        author: null,
        contents: null,
        like: 0,
        dislike: 0,
        scope: null,
        didLike: null,
        didDislike: null,
        replyList: {"3" :{
          author: 'asdf',
          contents: 'asdf'
        }},
        orderedReplyIdList : []
      }},
      orderedFeedIdList : []
    })
  })
})
