# firebase-saga

A library for connecting `redux-saga` middleware to <a href="https://firebase.google.com/">Firebase</a>.

[![version](https://img.shields.io/npm/v/firebase-saga.svg?style=flat-square)](https://www.npmjs.com/package/firebase-saga)
[![version](https://img.shields.io/npm/dt/firebase-saga.svg?style=flat-square)](https://www.npmjs.com/package/firebase-saga)

## Getting started

### Install

```
$ npm install firebase-saga --save
```

### API

Following functions are supported:

| Function                                             | Description                                             |
|------------------------------------------------------|---------------------------------------------------------|
| * create(path: *, fn: *): *                          | Saves new data to the database with set()               |
| * get(path: *, key: *): *                            | Fetches a record specified by the key from the database |
| * getAll(path: *): *                                 | Fetches entire snapshot of the database                 |
| * push(path: *, fn: *): *                            | Generates a new child location using a unique key       |
| * remove(path: *, key: *): *                         | Deletes a given child location using a unique key       |
| * update(path: *, key: *, payload: *): *             | Updates existing data in the database with update()     |
| * sync(path: *, mapEventToAction: {}, limit: number) |                                                         |

### Integrate Firebase with Sagas

The saga can be like the following:

```
import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import { getAll, get, create } from 'firebase-saga';

function* fetchPosts() {
    try {
        const posts = yield call(getAll, 'posts');
        yield put(actions.postsReceived(posts));
    }
    catch (error) {
        yield put(actions.fetchPostsFailed(error));
    }
}

function* fetchPost() {
    try {
        const posts = yield call(get, 'posts', '1');
        yield put(actions.postReceived(posts));
    }
    catch (error) {
        yield put(actions.fetchPostFailed(error));
    }
}

function* createPost() {
    try {
        const formData = yield select(getFormData);
        yield call(create, 'posts', () => ({
                [`posts/${formData.id}`]: {
                    title: formData.title,
                    body: formData.body,
                    timestamp: formData.timestamp
                }
            })
        );
        yield put(actions.postCreated());
    }
    catch (error) {
        yield put(actions.postCreationFailed(error));
    }
}

function* watchFetchPosts() {
    yield* takeEvery(actions.FETCH_POSTS, fetchPosts);
}

function* watchFetchPost() {
    yield* takeEvery(actions.FETCH_POST, fetchPost);
}

export default function* root() {
    yield [
        fork(watchFetchPosts),
        fork(watchFetchPost)
    ]
}
```

### Add Firebase to your web app

If you are using CDN only, add the URL to the `index.html` file, and specify the **Firebase** config:

```
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
	</head>
	<body>
		<main id="root"></main>
    <script src="https://www.gstatic.com/firebasejs/3.2.0/firebase.js">
    </script>
		<script>
			// Initialize Firebase
			var config = {
				apiKey: '<YOUR API KEY>',
				authDomain: '<YOUR APP NAME>.firebaseapp.com',
				databaseURL: 'https://<YOUR APP NAME>.firebaseio.com',
				storageBucket: '<YOUR APP NAME>.appspot.com'
			};
			firebase.initializeApp(config);
		</script>
		<script src="build.js"></script>
	</body>
</html>
```

If you are using **Webpack** or **Browserify**, you can install the **firebase** node module and then import it into the root components. 

```
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
```

## Example

* [Sample Application](https://github.com/szaranger/firebase-saga/tree/master/examples/blog)

## Documentation

* [Overview](http://szaranger.github.io/firebase-saga/docs/manual/overview.html)
* [Installation](http://szaranger.github.io/firebase-saga/docs/manual/installation.html)
* [Tutorial](http://szaranger.github.io/firebase-saga/docs/manual/tutorial.html)
* [Usage](http://szaranger.github.io/firebase-saga/docs/manual/usage.html)
* [Configuration](http://szaranger.github.io/firebase-saga/docs/manual/configuration.html)
* [Example](http://szaranger.github.io/firebase-saga/docs/manual/example.html)
* [Reference](http://szaranger.github.io/firebase-saga/docs/identifiers.html)
* [FAQ](http://szaranger.github.io/firebase-saga/docs/manual/faq.html)
* [Changelog](http://szaranger.github.io/firebase-saga/docs/manual/changelog.html)
