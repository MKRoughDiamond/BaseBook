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

export const TOCHAT = 'TOCHAT';
export const START_CHAT = 'START_CHAT';

export const GET_CHAT_LIST = 'GET_CHAT_LIST';
export const SET_CHAT_LIST = 'SET_CHAT_LIST';
export const GET_CHAT = 'GET_CHAT';
export const SET_CHAT = 'SET_CHAT';
export const POST_CHAT = 'POST_CHAT';


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

export function setLikes(id, likes, didLike) {
  return {
    type: SET_LIKES,
    id: id,
    likes: likes,
    didLike: didLike
  };
}

export function setDislikes(id, dislikes, didDislike) {
  return {
    type: SET_DISLIKES,
    id: id,
    dislikes: dislikes,
    didDislike: didDislike
  };
}

export function toChat() {
  return {
    type : TOCHAT
  };
}

export function startChat(username) {
  return {
    type: START_CHAT,
    username: username
  };
}

export function getChatList() {
  return {
    type: GET_CHAT_LIST
  };
}

export function setChatList(list) {
  return {
    type: SET_CHAT_LIST,
    list: list
  };
}

export function getChat(id) {
  return {
    type: GET_CHAT,
    id: id
  };
}

export function setChat(id, chat) {
  return {
    type: SET_CHAT,
    id: id,
    chat: chat
  };
}

export function postChat(contents) {
  return {
    type: POST_CHAT,
    contents: contents
  };
}
