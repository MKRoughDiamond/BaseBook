import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas';
import {Provider} from 'react-redux';
import Login from './components/Login';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Timeline from './components/Timeline';
import HashFeed from './components/HashFeed';
import MultiChat from './components/MultiChat';
import NotFound from './components/NotFound';
import reducers from './reducers';
import SoundManager from './components/SoundManager';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const rootElement = document.getElementById('root');

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <SoundManager/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Feed}/>
          <Route path="/timeline/:username" component={Timeline}/>
          <Route path="/hashtag/:tagname" component={HashFeed}/>
          <Route path="/users/profile" component={Profile}/>
          <Route path="/login" component={Login}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/multichat" component={MultiChat}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>,
  rootElement
);
