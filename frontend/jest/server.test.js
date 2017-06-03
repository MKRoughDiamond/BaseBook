import server, {serverInitialState} from '../src/reducers/server';
import * as types from '../src/actions';

describe('server reducer', () => {
  it('should return the initial state', () => {
    expect(
      server(undefined, {})
    ).toEqual({
      ID: '',
      PW: '',
      hash: null,
      newID: '',
      newPW: '',
      retypePW: '',
      isLogin: true,
      loggedIn: false,
      errorMsg: null,
      onTimeline: false,
      timelineUser: null,
      soundStart: false,
      soundUrl: null
    })
  })

  it('should handle SETID', () => { 
    expect (
      server({}, {
        type : types.SETID,
        ID : 'asdf'
      })
    ).toEqual({
      ID : 'asdf'
    })
  })

  it('should handle SETPW', () => { 
    expect (
      server({}, {
        type : types.SETPW,
        PW : 'asdf'
      })
    ).toEqual({
      PW : 'asdf'
    })
  })

  it('should handle NEWID', () => { 
    expect (
      server({}, {
        type : types.NEWID,
        newID : 'asdf'
      })
    ).toEqual({
      newID : 'asdf'
    })
  })

  it('should handle NEWPW', () => { 
    expect (
      server({}, {
        type : types.NEWPW,
        newPW : 'asdf'
      })
    ).toEqual({
      newPW : 'asdf'
    })
  })

  it('should handle RETYPEPW', () => { 
    expect (
      server({}, {
        type : types.RETYPEPW,
        retypePW : 'asdf'
      })
    ).toEqual({
      retypePW : 'asdf'
    })
  })

  it('should handle TOFEED', () => { 
    expect (
      server({}, {
        type : types.TOFEED
      })
    ).toEqual({
      onTimeline: false
    })
  })

  it('should handle TOMAIN', () => { 
    expect (
      server({}, {
        type : types.TOMAIN,
      })
    ).toEqual({
      isLogin : true,
      ID : '',
      PW : '',
      onTimeline : false
    })
  })

  it('should handle TOSIGNUP', () => { 
    expect (
      server({}, {
        type : types.TOSIGNUP
      })
    ).toEqual({
      isLogin : false,
      newID : '',
      newPW : '',
      retypePW : '',
      onTimeline: false
    })
  })

  it('should handle TOTIMELINE', () => { 
    expect (
      server({}, {
        type : types.TOTIMELINE,
        username : 'asdf'
      })
    ).toEqual({
      onTimeline: true,
      timelineUser : 'asdf'
    })
  })

  it('should handle LOGIN_SUCCESS', () => { 
    expect (
      server({}, {
        type : types.LOGIN_SUCCESS,
        hash : 'asdf',
      })
    ).toEqual({
      loggedIn : true,
      hash : 'asdf',
      onTimeline : false
    })
  })

  it('should handle LOGIN_PAGE_ERROR', () => { 
    expect (
      server({}, {
        type : types.LOGIN_PAGE_ERROR,
        msg : 'asdf'
      })
    ).toEqual({
      ID: '',
      PW: '',
      hash: null,
      newID: '',
      newPW: '',
      retypePW: '',
      isLogin: true,
      loggedIn: false,
      errorMsg: 'asdf',
      onTimeline: false,
      timelineUser: null,
      soundStart: false,
      soundUrl: null
    })
  })

  it('should handle LOGOUT', () => { 
    expect (
      server({}, {
        type : types.LOGOUT
      })
    ).toEqual({
      ID: '',
      PW: '',
      hash: null,
      newID: '',
      newPW: '',
      retypePW: '',
      isLogin: true,
      loggedIn: false,
      errorMsg: null,
      onTimeline: false,
      timelineUser: null,
      soundStart: false,
      soundUrl: null
    })
  })
})
