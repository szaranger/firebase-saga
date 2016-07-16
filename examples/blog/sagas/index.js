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
  yield* takeEvery(fetchPosts);
}
