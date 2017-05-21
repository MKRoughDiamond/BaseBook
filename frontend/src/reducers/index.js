import { combineReducers } from 'redux';
import server from './server';
import feed from './feed';
import chat from './chat';
import userSearch from './userSearch';

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
  extra
});

export default reducers;
