# firebase-saga

A library for connecting `redux-saga` middleware to <a href="https://firebase.google.com/">Firebase</a>.

## Getting started

###Install

```
$ npm install firebase-saga --save
```

## Connecting to Sagas

The saga can be like the following:

```
import { takeEvery } from 'redux-saga';
import * as actions from '../actions';
import * as firebaseRef from 'firebase-saga';

function* fetchPosts() {
  const posts = yield call(firebaseRef.get, 'posts');
  if (posts) {
    yield put(actions.receivePosts(posts);
  } else {
    yield put(actions.requestGetPostsFailed());
  }
}

function* get() {
  yield* takeEvery(actions.FETCH_POSTS,  fetchPosts);
}
```
