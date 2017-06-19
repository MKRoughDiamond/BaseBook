import image from '../src/reducers/image';
import * as types from '../src/actions';

describe('image reducer', () => {
  it('should return the initial state', () => {
    expect (
      image(undefined, {})
    ).toEqual({
      name: null,
      url: null
    })
  })

  it('should handle TOFEED', () => {
    expect (
      image({}, {type: types.TOFEED})
    ).toEqual({
      name: null,
      url: null
    })
  })
    
  it('should handle LOGOUT', () => {
    expect (
      image({}, {type: types.LOGOUT})
    ).toEqual({
      name: null,
      url: null
    })
  })
    
  it('should handle TOCHAT', () => {
    expect (
      image({}, {type: types.TOCHAT})
    ).toEqual({
      name: null,
      url: null
    })
  })
    
  it('should handle TOPROFILE', () => {
    expect (
      image({}, {type: types.TOPROFILE})
    ).toEqual({
      name: null,
      url: null
    })
  })

  it('should handle TOMULTICHAT', () => {
    expect (
      image({}, {type: types.TOMULTICHAT})
    ).toEqual({
      name: null,
      url: null
    })
  })
    
  it('should handle TOTIMELINE', () => {
    expect (
      image({}, {type: types.TOTIMELINE})
    ).toEqual({
      name: null,
      url: null
    })
  })
    
  it('should handle TOHASHFEED', () => {
    expect (
      image({}, {type: types.TOHASHFEED})
    ).toEqual({
      name: null,
      url: null
    })
  })
    
  it('should handle TOMAIN', () => {
    expect (
      image({}, {type: types.TOMAIN})
    ).toEqual({
      name: null,
      url: null
    })
  })
    
  it('should handle TOSIGNUP', () => {
    expect (
      image({}, {type: types.TOSIGNUP})
    ).toEqual({
      name: null,
      url: null
    })
  })
    
  it('should handle GET_IMAGE_URL', () => {
    expect (
      image({}, {
        type: types.GET_IMAGE_URL,
        name: 'asdf',
        url: 'asdf'
      })
    ).toEqual({
      name: 'asdf',
      url: 'asdf'
    })
  })
    
  it('should handle DELETE_IMAGE', () => {
    expect (
      image({}, {type: types.DELETE_IMAGE})
    ).toEqual({
      name: null,
      url: null
    })
  })
})
    
