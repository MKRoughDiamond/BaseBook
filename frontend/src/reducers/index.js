import { combineReducers } from 'redux';
import server from './server';
import feed from './feed';

const extra = (state = { value : 'WIP' }, action) => {
  switch(action.type) {
  default:
    return state;
  }
};

const reducers = combineReducers({
  server,
  feed,
  extra
});

export default reducers;
