import { combineReducers } from 'redux';
import server from './server';
import feed from './feed';
import startChat from './startChat';
import chat from './chat';

const extra = (state = { value : 'WIP' }, action) => {
  switch(action.type) {
  default:
    return state;
  }
};

const reducers = combineReducers({
  server,
  feed,
  startChat,
  chat,
  extra
});

export default reducers;
