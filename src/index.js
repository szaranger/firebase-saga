import { eventChannel } from 'redux-saga';
import { put, fork, call, take } from 'redux-saga/effects';

export const CHILD_ADDED = 'child_added';
export const CHILD_REMOVED = 'child_removed';
export const CHILD_CHANGED = 'child_changed';
export const CHILD_MOVED = 'child_moved';
export const VALUE = 'value';

const EVENT_TYPES = [CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED, CHILD_MOVED, VALUE];

const newOpts = (name = 'data') => {
    const opts = {};
    const chan = eventChannel(emit => {
        opts.handler = obj => {
            emit({ [name]: obj });
        };
        return () => {};
    });

    chan.handler = opts.handler;
    return chan;
};

export const newKey = (path) => firebase.database().ref().child(path).push().key;

/**
 * Fetches a record specified by the key from the database
 *
 * @param path
 * @param key
 * @returns {*|any}
 * import { get } from 'firebase-saga';
 *
 * const posts = yield call(get, 'posts', '1234');
 */
export function* get(path, key) {
    const ref = firebase.database().ref(`${path}/${key}`);
    const data = yield call([ref, ref.once], 'value');

    return data.val();
}

/**
 * Fetches entire snapshot of the database
 *
 * @param path
 * @returns {*|any}
 * @example
 * import { getAll } from 'firebase-saga';
 *
 * const posts = yield call(getAll, 'posts');
 */
export function* getAll(path) {
    const ref = firebase.database().ref(path);
    const data = yield call([ref, ref.once], 'value');

    return data.val();
}

/**
 * Saves new data to the database with `set()`
 *
 * @param path
 * @param fn
 * @example
 * import { create } from 'firebase-saga';
 *
 * yield call(create, 'posts', () => ({
 *              [`posts/1234`]: {
 *                   title: 'My Second Post',
 *                   body: 'Second post details',
 *                   timestamp: +new Date
 *               }
 *           })
 *);
 */
export function* create(path, fn) {
    const key = yield call(newKey, path);
    const payload = yield call(fn, key);
    const opts = newOpts('error');
    const ref = firebase.database().ref();
    const [ _, { error } ] = yield [
        call([ref, ref.update], payload, opts.handler),
        take(opts)
    ];
    return error;
}

/**
 * Updates existing data in the database with `update()`
 *
 * @param path
 * @param key
 * @param payload
 * @returns {*}
 * * import { update } from 'firebase-saga';
 *
 * yield call(update, 'posts', '1234', { 'Second Post', 'My seond post details', +new Date });
 */
export function* update(path, key, payload) {
    if (typeof payload === 'function') {
        payload = yield call(payload);
    }
    const opts = newOpts('error');
    const ref = firebase.database().ref(`${path}/${key}`);
    const [ _, { error } ] = yield [
        call([ref, ref.update], payload, opts.handler),
        take(opts)
    ];
    return error;
}

/**
 * Updates existing data in the database with `update()`
 *
 * @param path
 * @param key
 * @param payload
 * @returns {*}
 * * import { updateAll } from 'firebase-saga';
 *
 * const postDate = { title: 'My Second Post',
 *                   body: 'Second post details',
 *                   timestamp: +new Date };
 * const updates = {};
 * updates['/posts/' + newPostKey] = postData;
 * updates['/user-posts/' + uid + '/' + newPostKey] = postData;
 * yield call(updateAll, 'posts', updates);
 */
export function* updateAll(path, payload) {
    if (typeof payload === 'function') {
        payload = yield call(payload);
    }
    const opts = newOpts('error');
    const ref = firebase.database().ref(path);
    const [ _, { error } ] = yield [
        call([ref, ref.update], payload, opts.handler),
        take(opts)
    ];
    return error;
}

/**
 * Generates a new child location using a unique key
 *
 * @param path
 * @param fn
 * @param getkey
 * @example
 * import { push } from 'firebase-saga';
 *
 * yield call(push, 'posts', () => ({
 *             title: formData.title,
 *             body: formData.body,
 *             timestamp: formData.timestamp
 *       })
 *);
 */
export function* push(path, fn, getKey = false) {
    const key = yield call(newKey, path);
    const payload = yield call(fn, key);
    const opts = newOpts('error');
    const ref = firebase.database().ref(path);
    const [ _, { error } ] = yield [
        call([ref, ref.push], payload, opts.handler),
        take(opts)
    ];

    if(getKey && error === undefined) {
      return key;
    }

    return error;
}

/**
 * Deletes a given child location using a unique key
 *
 * @param path
 * @param key
 * @example
 * import { push } from 'firebase-saga';
 *
 * yield call(push, 'posts', () => ({
 *             title: formData.title,
 *             body: formData.body,
 *             timestamp: formData.timestamp
 *       })
 *);
 */

/**
 * Deletes a given child location using a unique key
 *
 * @param path
 * @param key
 * @returns {*}
 * @example
 * import { remove } from 'firebase-saga';
 *
 * yield call(remove, 'posts', '1234')
 */
export function* remove(path, key) {
    const opts = newOpts('error');
    const ref = firebase.database().ref(`${path}/${key}`);
    const [ _, { error } ] = yield [
        call([ref, ref.remove], opts.handler),
        take(opts)
    ];
    return error;
}

function* runSync(ref, eventType, actionCreator) {
    const opts = newOpts();
    yield call([ref, ref.on], eventType, opts.handler);

    while (true) {
        const { data } = yield take(opts);
        yield put(actionCreator({ key: data.key, value: data.val() }));
    }
}

/**
 * Gets fired every time a child added, remove, changed, or moved
 *
 * @param path
 * @param mapEventToAction
 * @param limit
 * @example
 * import { sync, CHILD_ADDED, CHILD_REMOVED } from 'firebase-saga';
 *
 *function* syncPosts() {
 *   yield fork(sync, 'posts', {
 *       [CHILD_ADDED]: actions.syncPostAdded,
 *       [CHILD_REMOVED]: actions.syncPostRemoved
 *   });
 *}
 */
export function* sync(path, mapEventToAction = {}, limit) {
    const ref = typeof limit === 'number' ?
        firebase.database().ref(path).limitToLast(limit)
        : firebase.database().ref(path);

    for (let type of EVENT_TYPES) {
        const action = mapEventToAction[type];

        if (typeof action === 'function') {
            yield fork(runSync, ref, type, action);
        }
    }
}
