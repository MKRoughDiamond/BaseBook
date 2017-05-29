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

export const GET_REPLY_LIST = 'GET_REPLY_LIST';
export const SET_REPLY_LIST = 'SET_REPLY_LIST';
export const GET_REPLY = 'GET_REPLY';
export const SET_REPLY = 'SET_REPLY';
export const POST_REPLY = 'POST_REPLY';

export const POST_LIKES = 'POST_LIKES';
export const POST_DISLIKES = 'POST_DISLIKES';
export const GET_LIKES = 'GET_LIKES';
export const GET_DISLIKES = 'GET_DISLIKES';
export const SET_LIKES = 'SET_LIKES';
export const SET_DISLIKES = 'SET_DISLIKES';

export const TOCHAT = 'TOCHAT';
export const START_CHAT = 'START_CHAT';
export const GET_CHAT_ROOM_ID = 'GET_CHAT_ROOM_ID';

export const GET_CHAT_LIST = 'GET_CHAT_LIST';
export const SET_CHAT_LIST = 'SET_CHAT_LIST';
export const GET_CHAT = 'GET_CHAT';
export const SET_CHAT = 'SET_CHAT';
export const POST_CHAT = 'POST_CHAT';
export const TOFEED = 'TOFEED';
export const TOTIMELINE = 'TOTIMELINE';
export const GET_TIMELINE_LIST = 'GET_TIMELINE_LIST';

export const GET_USER_LIST = 'GET_USER_LIST';
export const SET_USER_LIST = 'SET_USER_LIST';
export const USER_QUERY = 'USER_QUERY';
export const LOGOUT = 'LOGOUT';

export const DELETE_FEED = 'DELETE_FEED';
export const DELETE_REPLY = 'DELETE_REPLY';

export const START_SOUND = 'START_SOUND';
export const END_SOUND = 'END_SOUND';

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

export function toFeed() {
  return {
    type : TOFEED
  };
}

export function toTimeline(username) {
  return {
    type : TOTIMELINE,
    username : username
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

export function getReplyList(feedId) {
  return {
    type: GET_REPLY_LIST,
    feedId: feedId
  };
}

export function setReplyList(feedId, list) {
  return {
    type: SET_REPLY_LIST,
    feedId: feedId,
    list: list
  };
}

export function getReply(feedId, replyId) {
  return {
    type: GET_REPLY,
    feedId: feedId,
    replyId: replyId
  };
}

export function setReply(feedId, replyId, reply) {
  return {
    type: SET_REPLY,
    feedId: feedId,
    replyId: replyId,
    reply: reply
  };
}

export function postReply(feedId, contents) {
  return {
    type: POST_REPLY,
    feedId: feedId,
    contents: contents,
  };
}

export function toChat() {
  return {
    type: TOCHAT
  };
}

export function startChat(username) {
  return {
    type: START_CHAT,
    username: username
  };
}

export function getChatRoomID(chatRoomID) {
  return {
    type: GET_CHAT_ROOM_ID,
    chatRoomID: chatRoomID
  };
}

export function getChatList(chatRoomID) {
  return {
    type: GET_CHAT_LIST,
    chatRoomID: chatRoomID
  };
}

export function setChatList(list) {
  return {
    type: SET_CHAT_LIST,
    list: list
  };
}

export function getChat(chatRoomID) {
  return {
    type: GET_CHAT,
    chatRoomID: chatRoomID
  };
}

export function setChat(list) {
  return {
    type: SET_CHAT,
    list: list
  };
}

export function postChat(chatRoomID, contents) {
  return {
    type: POST_CHAT,
    chatRoomID: chatRoomID,
    contents: contents
  };
}

export function getTimelineList() {
  return {
    type: GET_TIMELINE_LIST
  };
}

export function getUserList() {
  return {
    type: GET_USER_LIST
  };
}

export function setUserList(list) {
  return {
    type: SET_USER_LIST,
    list: list
  };
}

export function userQuery(keyword) {
  return {
    type: USER_QUERY,
    keyword: keyword
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function deleteFeed(id) {
  return {
    type: DELETE_FEED,
    id: id
  };
}

export function deleteReply(feedId, replyId) {
  return {
    type: DELETE_REPLY,
    feedId: feedId,
    replyId: replyId
  };
}

export function startSound(url) {
  return {
    type: START_SOUND,
    url: url
  };
}

export function endSound() {
  return {
    type: END_SOUND
  };
} 