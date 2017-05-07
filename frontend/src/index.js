import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas';
import {Provider} from 'react-redux';
import App from './components/App';
import serverApp from './reducers';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(serverApp, applyMiddleware(sagaMiddleware));
const rootElement = document.getElementById('root');

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
