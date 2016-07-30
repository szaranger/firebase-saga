import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import { getAll, get } from 'firebase-saga';

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
