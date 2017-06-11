import chat from '../src/reducers/chat';
import * as types from '../src/actions';

describe('chat reducer', ()=> {
  it('should return the initial state', ()=> {
    expect(
      chat(undefined, {})
    ).toEqual(
      {
        desiredChatCount: 0,
        chatOn: false,
        otherUsername: null,
        chatRoomID: null,
        chatList: []
      }
    )
  })

  it('should handle TOCHAT', () => {
    expect (
      chat({}, { type : types.TOCHAT })
      ).toEqual({
        chatOn : true
    })
  })

  it('should handle TOFEED', () => {
    expect (
      chat({}, {type : types.TOFEED })
    ).toEqual({
      chatOn : false,
      desiredChatCount:0,
      otherUsername: null,
      chatRoomID: null,
      chatList: []
    })
  })

  it('should handle LOGOUT', () => {
    expect (
      chat({}, { type: types.LOGOUT })
    ).toEqual({
      desiredChatCount: 0,
      chatOn: false,
      otherUsername: null,
      chatRoomID: null,
      chatList: []
    }
  )
  })

  it('should handle START_CHAT', () => {
    expect (
        chat({}, {
          type: types.START_CHAT,
          username : 'asdf'
        })
        ).toEqual({
          otherUsername : 'asdf',
          chatList: [],
          desiredChatCount: 0
    })
  })

  it('should handle GET_CHAT_ROOM_ID', () => {
    expect (
        chat({}, {
          type: types.GET_CHAT_ROOM_ID,
          chatRoomID : 1
        })
        ).toEqual({
          chatRoomID : 1
    })
  })

  it('should handle SET_CHAT', () => {
    expect (
        chat({ chatList : [] }, {
          type : types.SET_CHAT,
          list: [{
            timestamp: '2017-05-11T19:45:00.163834Z',
            username: 'asdf',
            contents: 'asdf'
          }]
        })
    ).toEqual({
      chatList : [{
        contents: 'asdf',
        id : 0,
        timestamp : '19:45:00',
        username : 'asdf'
      }],
      desiredChatCount: 1
    })
  })
})
