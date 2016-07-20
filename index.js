import { eventChannel } from 'redux-saga';
import { put, fork, call, take } from 'redux-saga/effects';

const EVENT_TYPES = ['child_added', 'child_removed'];

function newOpts(name = 'data') {
	const opts = {};
	const chan = eventChannel(emit => {
		opts.handler = obj => {
			emit({ [name]: obj });
		};
		return () => {};
	});
	chan.handler = opts.handler;
	return chan;
}

function newKey(path) {
	return firebase.database().ref().child(path).push().key;
}

export function* get(path, key) {
	const ref = firebase.database().ref(`${path}/${key}`);
	const data = yield call([ref, ref.once], 'value');

	return data.val();
}

export function* getAll(path) {
	const ref = firebase.database().ref(path);
	const data = yield call([ref, ref.once], 'value');

	return data.val();
}

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

function* runSync(ref, eventType, creator) {
	const opts = newOpts();
	yield call([ref, ref.on], eventType, opts.handler);

	while (true) {
		const { data } = yield take(opts);
		yield put(creator({ data }));
	}
}

export function* sync(path, mapEventToAction = {}, limit = 20) {
	const ref = firebase.database().ref(path).limitToLast(limit);

	for (let type of EVENT_TYPES) {
		const action = mapEventToAction[type];
		if (typeof action === 'function') {
			yield fork(runSync, ref, type, action);
		}
	}
}
