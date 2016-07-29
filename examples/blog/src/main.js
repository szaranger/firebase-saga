import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import firebase from 'firebase';
import Blog from './containers/Blog';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

firebase.initializeApp({
    apiKey: '<YOUR API KEY>',
    authDomain: '<YOUR APP NAME>.firebaseapp.com',
    databaseURL: 'https://<YOUR APP NAME>.firebaseio.com',
    storageBucket: '<YOUR APP NAME>.appspot.com'
});

ReactDOM.render(
    <Provider store={store}>
        <Blog />
    </Provider>,
    document.getElementById('root')
);
