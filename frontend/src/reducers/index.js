import { combineReducers } from 'redux';
import server from './server';
import feed from './feed';
import chat from './chat';
import userSearch from './userSearch';
import multichat from './multichat';
import image from './image';

const extra = (state = { value : 'WIP' }, action) => {
  switch(action.type) {
  default:
    return state;
  }
};

const reducers = combineReducers({
  server,
  feed,
  chat,
  userSearch,
  multichat,
  extra,
  image
});

export default reducers;
