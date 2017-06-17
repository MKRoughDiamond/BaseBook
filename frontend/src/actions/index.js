export const SETID = 'SETID';
export const SETNICK = 'SETNICK';
export const SETPW = 'SETPW';
export const NEWID = 'NEWID';
export const NEWNICK = 'NEWNICK';
export const NEWPW = 'NEWPW';
export const RETYPEPW = 'RETYPEPW';
export const CONFIRMPW = 'CONFIRMPW';
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

export const CHANGE_PROFILE = 'CHANGE_PROFILE';

export const TOTIMELINE = 'TOTIMELINE';
export const GET_TIMELINE_LIST = 'GET_TIMELINE_LIST';

export const GET_USER_LIST = 'GET_USER_LIST';
export const SET_USER_LIST = 'SET_USER_LIST';
export const USER_QUERY = 'USER_QUERY';
export const LOGOUT = 'LOGOUT';
export const TOPROFILE = 'TOPROFILE';

export const DELETE_FEED = 'DELETE_FEED';
export const DELETE_REPLY = 'DELETE_REPLY';

export const START_SOUND = 'START_SOUND';
export const END_SOUND = 'END_SOUND';

export const TOHASHFEED = 'TOHASHFEED';
export const GET_HASHFEED_LIST = 'GET_HASHFEED_LIST';

export const POST_FRIEND = 'POST_FRIEND';

export const TOMULTICHAT = 'TOMULTICHAT';
export const CREATE_MULTICHAT = 'CREATE_MULTICHAT';
export const START_MULTICHAT = 'START_MULTICHAT';

export const GET_MULTICHATROOM_LIST = 'GET_MULTICHATROOM_LIST';
export const SET_MULTICHATROOM_LIST = 'SET_MULTICHATROOM_LIST';
export const SET_MULTICHATROOM = 'SET_MULTICHATROOM';

export const GET_MULTICHAT_ROOM_ID = 'GET_MULTICHAT_ROOM_ID';
export const GET_MULTICHAT_LIST = 'GET_MULTICHAT_LIST';

export const SET_MULTICHAT_LIST = 'SET_MULTICHAT_LIST';
export const GET_MULTICHAT = 'GET_MULTICHAT';
export const SET_MULTICHAT = 'SET_MULTICHAT';
export const POST_MULTICHAT = 'POST_MULTICHAT';

export const MAFIA_GENERAL = 'MAFIA_GENERAL';
export const MAFIA_TARGET = 'MAFIA_TARGET';

export function setID(value) {
  return {
    type : SETID,
    ID : value
  };
}

export function setNick(value) {
  return {
    type : SETNICK,
    Nick : value
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

export function newNick(value) {
  return {
    type : NEWNICK,
    newNick : value
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

export function confirmPW(value) {
  return {
    type : CONFIRMPW,
    confirmPW : value
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

export function changeProfile(newNick, newPW, retypePW) {
  return {
    type: CHANGE_PROFILE,
    newNick: newNick,
    newPW: newPW,
    retypePW: retypePW,
  };
}


export function setFeed(id, feed) {
  return {
    type: SET_FEED,
    id: id,
    feed: feed
  };
}

export function postFeed(contents, scope, feedtype) {
  return {
    type: POST_FEED,
    contents: contents,
    scope: scope,
    feedtype: feedtype
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

export function toProfile() {
  return {
    type: TOPROFILE
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

export function postFriend(username) {
  return {
    type: POST_FRIEND,
    username: username
  };
}

export function toHashFeed(tagname) {
  return {
    type : TOHASHFEED,
    tagname : tagname
  };
}

export function getHashFeedList() {
  return {
    type: GET_HASHFEED_LIST
  };
}

export function toMultiChat() {
  return {
    type: TOMULTICHAT
  };
}

export function createMultiChat() {
  return {
    type: CREATE_MULTICHAT
  };
}

export function startMultiChat(multichatRoomID) {
  return {
    type: START_MULTICHAT,
    multichatRoomID: multichatRoomID
  };
}

export function getMultiChatRoomList() {
  return {
    type: GET_MULTICHATROOM_LIST
  };
}

export function setMultiChatRoomList(list, enterList, countList) {
  return {
    type: SET_MULTICHATROOM_LIST,
    list: list,
    enterList: enterList,
    countList: countList
  };
}

export function setMultiChatRoom(id, room) {
  return {
    type: SET_MULTICHATROOM,
    id: id,
    room: room
  };
}

export function getMultiChatRoomID(multichatRoomID) {
  return {
    type: GET_MULTICHAT_ROOM_ID,
    multichatRoomID: multichatRoomID
  };
}

export function getMultiChatList(multichatRoomID) {
  return {
    type: GET_MULTICHAT_LIST,
    multichatRoomID: multichatRoomID
  };
}

export function setMultiChatList(list) {
  return {
    type: SET_MULTICHAT_LIST,
    list: list
  };
}

export function getMultiChat(multichatRoomID) {
  return {
    type: GET_MULTICHAT,
    multichatRoomID: multichatRoomID
  };
}

export function setMultiChat(list) {
  return {
    type: SET_MULTICHAT,
    list: list
  };
}

export function postMultiChat(multichatRoomID, contents) {
  return {
    type: POST_MULTICHAT,
    multichatRoomID: multichatRoomID,
    contents: contents
  };
}

export function mafiaGeneral(roomID, suburl) {
  return {
    type: MAFIA_GENERAL,
    roomID: roomID,
    suburl: suburl
  };
}

export function mafiaTarget(roomID, target) {
  return {
    type: MAFIA_TARGET,
    roomID: roomID,
    target: target
  };
}

