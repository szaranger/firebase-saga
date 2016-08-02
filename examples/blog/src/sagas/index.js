import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import * as actions from '../actions';
import { getFormData, getId } from '../reducers';
import { getAll, get, create, push, remove } from 'firebase-saga';

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
        const postId = yield select(getId);
        const posts = yield call(get, 'posts', postId);
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
        // Generates a new child location using a unique key
        // yield call(push, 'posts', () => ({
        //             title: formData.title,
        //             body: formData.body,
        //             timestamp: formData.timestamp
        //     })
        // );
        yield put(actions.postCreated());
    }
    catch (error) {
        yield put(actions.postCreationFailed(error));
    }
}

function* deletePost() {
    try {
        const postId = yield select(getId);
        yield call(remove, 'posts', postId)
        yield put(actions.postDeleted());
        yield fetchPosts();
    }
    catch (error) {
        yield put(actions.postDeletionFailed(error));
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

function* watchDeletePost() {
    yield* takeEvery(actions.DELETE_POST, deletePost);
}

export default function* root() {
    yield [
        fork(watchFetchPosts),
        fork(watchFetchPost),
        fork(watchCreatePost),
        fork(watchDeletePost)
    ]
}
