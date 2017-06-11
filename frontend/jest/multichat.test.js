import multichat from '../src/reducers/multichat';
import * as types from '../src/actions';

describe('multichat reducer', () => {
    it('should return the initial state', () => {
        expect(
            multichat(undefined, {})
        ).toEqual({
            desiredMultiChatCount: 0,
            multichatOn: false,
            multichatRoomIDList: [],
            multichatRoomID: null,
            multichatList: [],
            multichatEnterList: []
        })
    })

    it('should handle TOMULTICHAT', () => {
        expect (
            multichat({}, { type: types.TOMULTICHAT })
        ).toEqual({
            multichatOn: true,
            multichatRoomID: null
        })
    })

    it('should handle TOFEED', () => {
        expect (
            multichat({}, { type: types.TOFEED })
        ).toEqual({
            desiredMultiChatCount: 0,
            multichatOn: false,
            multichatRoomIDList: [],
            multichatRoomID: null,
            multichatList: [],
            multichatEnterList: []
        })
    })

    it('should handle LOGOUT', () => {
        expect (
            multichat({}, { type: types.LOGOUT })
        ).toEqual({
            desiredMultiChatCount: 0,
            multichatOn: false,
            multichatRoomIDList: [],
            multichatRoomID: null,
            multichatList: [],
            multichatEnterList: []
        })
    })

    it('should handle START_MULTICHAT', () => {
        expect (
            multichat({}, { 
                type: types.START_MULTICHAT,
                multichatRoomID: 1
            })
        ).toEqual({
            multichatRoomID: 1
        })
    })

    it('should handle GET_MULTICHAT_ROOM_ID', () => {
        expect (
            multichat({}, { 
                type: types.GET_MULTICHAT_ROOM_ID,
                multichatRoomID: 1
            })
        ).toEqual({
            multichatRoomID: 1
        })
    })

    it('should handle SET_MULTICHATROOM_LIST', () => {
        expect (
            multichat({}, { 
                type: types.SET_MULTICHATROOM_LIST,
                list: [3],
                enterList: [3]
            })
        ).toEqual({
            multichatRoomIDList: [3],
            multichatEnterList: [3]
        })
    })

    it('should handle SET_MULTICHAT', () => {
        expect (
            multichat({ multichatList: []}, { 
                type: types.SET_MULTICHAT,
                list: [{ 
                    timestamp: '2017-05-11T19:45:00.163834Z',
                    username: 'asdf',
                    contents: 'asdf'
                }]
            })
        ).toEqual({
            desiredMultiChatCount: 1,
            multichatList: [{
                contents: 'asdf',
                id: 0,
                timestamp: '19:45:00',
                username: 'asdf'
            }]
        })
    })
})
