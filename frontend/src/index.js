import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas';
import {Provider} from 'react-redux';
import Login from './components/Login';
import Feed from './components/Feed';
import Chat from './components/Chat';
import Timeline from './components/Timeline';
import NotFound from './components/NotFound';
import reducers from './reducers';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const rootElement = document.getElementById('root');

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Feed}/>
        <Route path="/login" component={Login}/>
        <Route path="/timeline/:username" component={Timeline}/>
        <Route path="/chat/:id" component={Chat}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  rootElement
);
