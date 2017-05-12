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
export const GET_FEED = 'GET_FEED';
export const SET_FEED = 'SET_FEED';
export const POST_FEED = 'POST_FEED'; 
export const POST_LIKES = 'POST_LIKES';
export const POST_DISLIKES = 'POST_DISLIKES';
export const GET_LIKES = 'GET_LIKES';
export const GET_DISLIKES = 'GET_DISLIKES';
export const SET_LIKES = 'SET_LIKES';
export const SET_DISLIKES = 'SET_DISLIKES';

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

export function loginSuccess(hash) {
  return {
    type: LOGIN_SUCCESS,
    hash: hash
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

export function getFeed(id) {
  return {
    type: GET_FEED,
    id: id
  };
}

export function setFeed(id, feed) {
  return {
    type: SET_FEED,
    id: id,
    feed: feed
  };
}

export function postFeed(contents, scope) {
  return {
    type: POST_FEED,
    contents: contents,
    scope: scope
  };
}

export function postLikes(id) {
  return {
    type: POST_LIKES,
    id: id
  };
}

export function postDislikes(id) {
  return {
    type: POST_DISLIKES,
    id: id
  };
}

export function getLikes(id) {
  return {
    type: GET_LIKES,
    id: id
  };
}

export function getDislikes(id) {
  return {
    type: GET_DISLIKES,
    id: id
  };
}

export function setLikes(id, likes)
{
  return {
    type: SET_LIKES,
    id: id,
    likes: likes
  };
}

export function setDislikes(id, dislikes)
{
  return {
    type: SET_DISLIKES,
    id: id,
    dislikes: dislikes
  };
}
