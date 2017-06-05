import userSearch from '../src/reducers/userSearch';
import * as types from '../src/actions';

describe('userSearch reducer', () => {
  it('should return the initial state', () => {
    expect(
      userSearch(undefined, {})
    ).toEqual(
      {
        userList : null,
        queriedUser : []
      })
  })

  it('should handle LOGOUT', () => {
    expect (
      userSearch({}, { type: types.LOGOUT })
    ).toEqual({
        userList: null,
        queriedUser: []
    })
  })

  it('should handle SET_USER_LIST', () => {
    expect (
      userSearch({}, {
        type: types.SET_USER_LIST,
        list: [3]
      })
    ).toEqual({
        userList : [3]
    })
  })

  it('should handle USER_QUERY', () => {
    expect (
      userSearch({ userList : ['asdf'] }, {
        type: types.USER_QUERY,
        keyword : 'asdf'
      })
    ).toEqual({
      userList : ['asdf'],
      queriedUser : ['asdf']
    })
  })
})
