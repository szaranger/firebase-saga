# firebase-saga

A library for connecting `redux-saga` middleware to <a href="https://firebase.google.com/">Firebase</a>.

## Getting started

###Install

```
$ npm install firebase-saga --save
```

### Integrate Firebase with Sagas

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
		<script src="/static/bundle.js"></script>
	</body>
</html>
```

If you are using **Webpack** or **Browserify**, you can install the **firebase** node module and then import it into the root components. 

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import Root from './containers/Root'
import rootSaga from './sagas';

import configureStore from './store/configureStore';

const store = configureStore();

firebase.initializeApp({
  apiKey: '<YOUR API KEY>',
  authDomain: '<YOUR APP NAME>.firebaseapp.com',
  databaseURL: 'https://<YOUR APP NAME>.firebaseio.com',
  storageBucket: '<YOUR APP NAME>.appspot.com'
});

ReactDOM.render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('root')
);
```
