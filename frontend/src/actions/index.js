export const SETID = 'SETID';
export const SETPW = 'SETPW';
export const NEWID = 'NEWID';
export const NEWPW = 'NEWPW';
export const RETYPEPW = 'RETYPEPW';
export const TOMAIN = 'TOMAIN';
export const TOSIGNUP = 'TOSIGNUP';
export const LOGIN ='LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_PAGE_ERROR = 'LOGIN_PAGE_ERROR';
export const GET_FEED_LIST = 'GET_FEED_LIST';
export const SET_FEED_LIST = 'SET_FEED_LIST';

export function setID(value) {
  return {
    type : SETID,
    ID : value
  };
}

export function setPW(value) {
  return {
    type : SETPW,
    PW : value
  };
}

export function newID(value) {
  return {
    type : NEWID,
    newID : value
  };
}

export function newPW(value) {
  return {
    type : NEWPW,
    newPW : value
  };
}

export function retypePW(value) {
  return {
    type : RETYPEPW,
    retypePW : value
  };
}

export function toMain() {
  return {
    type : TOMAIN
  };
}

export function toSignUp() {
  return {
    type : TOSIGNUP
  };
}

export function login() {
  return {
    type: LOGIN
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  };
}

export function loginPageError(msg) {
  return {
    type: LOGIN_PAGE_ERROR,
    msg: msg
  };
}

export function getFeedList() {
  return {
    type: GET_FEED_LIST
  };
}

export function setFeedList(list) {
  return {
    type: SET_FEED_LIST,
    list: list
  };
}
