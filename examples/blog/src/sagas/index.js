import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import { getAll } from 'firebase-saga';

function* fetchPosts() {
    try {
        const posts = yield call(getAll);
        yield put(actions.postsReceived(posts));
    }
    catch (error) {
        yield put(actions.fetchPostsFailed(error));
    }
}

function* get() {
    yield* takeEvery(actions.FETCH_POSTS, fetchPosts);
}

export default function* root() {
    yield [
        fork(fetchPosts)
    ]
}