import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import * as actions from '../actions';
import { getFormData } from '../reducers';
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
        const posts = yield call(get, 'posts', '6c84fb90-12c4-11e1-840d-7b25c5ee775a');
        yield put(actions.postReceived(posts));
    }
    catch (error) {
        yield put(actions.fetchPostFailed(error));
    }
}

function* createPost() {
    try {
        const formData = yield select(getFormData);
        const posts = yield call(saveFormData, formData);
        yield put(actions.postCreated(posts));
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

function* watchCreatePost() {
    yield* takeEvery(actions.CREATE_POST, createPost);
}

export default function* root() {
    yield [
        fork(watchFetchPosts),
        fork(watchFetchPost),
        fork(watchCreatePost)
    ]
}
