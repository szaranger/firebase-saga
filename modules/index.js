'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.newKey = exports.VALUE = exports.CHILD_MOVED = exports.CHILD_CHANGED = exports.CHILD_REMOVED = exports.CHILD_ADDED = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.get = get;
exports.getAll = getAll;
exports.create = create;
exports.update = update;
exports.updateAll = updateAll;
exports.push = push;
exports.remove = remove;
exports.sync = sync;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [get, getAll, create, update, updateAll, push, remove, runSync, sync].map(_regenerator2.default.mark);

var CHILD_ADDED = exports.CHILD_ADDED = 'child_added';
var CHILD_REMOVED = exports.CHILD_REMOVED = 'child_removed';
var CHILD_CHANGED = exports.CHILD_CHANGED = 'child_changed';
var CHILD_MOVED = exports.CHILD_MOVED = 'child_moved';
var VALUE = exports.VALUE = 'value';

var EVENT_TYPES = [CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED, CHILD_MOVED, VALUE];

var newOpts = function newOpts() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data';

    var opts = {};
    var chan = (0, _reduxSaga.eventChannel)(function (emit) {
        opts.handler = function (obj) {
            emit((0, _defineProperty3.default)({}, name, obj));
        };
        return function () {};
    });

    chan.handler = opts.handler;
    return chan;
};

var newKey = exports.newKey = function newKey(path) {
    return firebase.database().ref().child(path).push().key;
};

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
function get(path, key) {
    var ref, data;
    return _regenerator2.default.wrap(function get$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    ref = firebase.database().ref(path + '/' + key);
                    _context.next = 3;
                    return (0, _effects.call)([ref, ref.once], 'value');

                case 3:
                    data = _context.sent;
                    return _context.abrupt('return', data.val());

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
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
function getAll(path) {
    var ref, data;
    return _regenerator2.default.wrap(function getAll$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    ref = firebase.database().ref(path);
                    _context2.next = 3;
                    return (0, _effects.call)([ref, ref.once], 'value');

                case 3:
                    data = _context2.sent;
                    return _context2.abrupt('return', data.val());

                case 5:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this);
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
function create(path, fn) {
    var key, payload, opts, ref, _ref, _ref2, _, error;

    return _regenerator2.default.wrap(function create$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return (0, _effects.call)(newKey, path);

                case 2:
                    key = _context3.sent;
                    _context3.next = 5;
                    return (0, _effects.call)(fn, key);

                case 5:
                    payload = _context3.sent;
                    opts = newOpts('error');
                    ref = firebase.database().ref();
                    _context3.next = 10;
                    return [(0, _effects.call)([ref, ref.update], payload, opts.handler), (0, _effects.take)(opts)];

                case 10:
                    _ref = _context3.sent;
                    _ref2 = (0, _slicedToArray3.default)(_ref, 2);
                    _ = _ref2[0];
                    error = _ref2[1].error;
                    return _context3.abrupt('return', error);

                case 15:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked[2], this);
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
function update(path, key, payload) {
    var opts, ref, _ref3, _ref4, _, error;

    return _regenerator2.default.wrap(function update$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    if (!(typeof payload === 'function')) {
                        _context4.next = 4;
                        break;
                    }

                    _context4.next = 3;
                    return (0, _effects.call)(payload);

                case 3:
                    payload = _context4.sent;

                case 4:
                    opts = newOpts('error');
                    ref = firebase.database().ref(path + '/' + key);
                    _context4.next = 8;
                    return [(0, _effects.call)([ref, ref.update], payload, opts.handler), (0, _effects.take)(opts)];

                case 8:
                    _ref3 = _context4.sent;
                    _ref4 = (0, _slicedToArray3.default)(_ref3, 2);
                    _ = _ref4[0];
                    error = _ref4[1].error;
                    return _context4.abrupt('return', error);

                case 13:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _marked[3], this);
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
function updateAll(path, payload) {
    var opts, ref, _ref5, _ref6, _, error;

    return _regenerator2.default.wrap(function updateAll$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    if (!(typeof payload === 'function')) {
                        _context5.next = 4;
                        break;
                    }

                    _context5.next = 3;
                    return (0, _effects.call)(payload);

                case 3:
                    payload = _context5.sent;

                case 4:
                    opts = newOpts('error');
                    ref = firebase.database().ref(path);
                    _context5.next = 8;
                    return [(0, _effects.call)([ref, ref.update], payload, opts.handler), (0, _effects.take)(opts)];

                case 8:
                    _ref5 = _context5.sent;
                    _ref6 = (0, _slicedToArray3.default)(_ref5, 2);
                    _ = _ref6[0];
                    error = _ref6[1].error;
                    return _context5.abrupt('return', error);

                case 13:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _marked[4], this);
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
function push(path, fn) {
    var getKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var key, payload, opts, ref, _ref7, _ref8, _, error;

    return _regenerator2.default.wrap(function push$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    _context6.next = 2;
                    return (0, _effects.call)(newKey, path);

                case 2:
                    key = _context6.sent;
                    _context6.next = 5;
                    return (0, _effects.call)(fn, key);

                case 5:
                    payload = _context6.sent;
                    opts = newOpts('error');
                    ref = firebase.database().ref(path);
                    _context6.next = 10;
                    return [(0, _effects.call)([ref, ref.push], payload, opts.handler), (0, _effects.take)(opts)];

                case 10:
                    _ref7 = _context6.sent;
                    _ref8 = (0, _slicedToArray3.default)(_ref7, 2);
                    _ = _ref8[0];
                    error = _ref8[1].error;

                    if (!(getKey && error === undefined)) {
                        _context6.next = 16;
                        break;
                    }

                    return _context6.abrupt('return', key);

                case 16:
                    return _context6.abrupt('return', error);

                case 17:
                case 'end':
                    return _context6.stop();
            }
        }
    }, _marked[5], this);
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
function remove(path, key) {
    var opts, ref, _ref9, _ref10, _, error;

    return _regenerator2.default.wrap(function remove$(_context7) {
        while (1) {
            switch (_context7.prev = _context7.next) {
                case 0:
                    opts = newOpts('error');
                    ref = firebase.database().ref(path + '/' + key);
                    _context7.next = 4;
                    return [(0, _effects.call)([ref, ref.remove], opts.handler), (0, _effects.take)(opts)];

                case 4:
                    _ref9 = _context7.sent;
                    _ref10 = (0, _slicedToArray3.default)(_ref9, 2);
                    _ = _ref10[0];
                    error = _ref10[1].error;
                    return _context7.abrupt('return', error);

                case 9:
                case 'end':
                    return _context7.stop();
            }
        }
    }, _marked[6], this);
}

function runSync(ref, eventType, actionCreator) {
    var opts, _ref11, data;

    return _regenerator2.default.wrap(function runSync$(_context8) {
        while (1) {
            switch (_context8.prev = _context8.next) {
                case 0:
                    opts = newOpts();
                    _context8.next = 3;
                    return (0, _effects.call)([ref, ref.on], eventType, opts.handler);

                case 3:
                    if (!true) {
                        _context8.next = 12;
                        break;
                    }

                    _context8.next = 6;
                    return (0, _effects.take)(opts);

                case 6:
                    _ref11 = _context8.sent;
                    data = _ref11.data;
                    _context8.next = 10;
                    return (0, _effects.put)(actionCreator({ key: data.key, value: data.val() }));

                case 10:
                    _context8.next = 3;
                    break;

                case 12:
                case 'end':
                    return _context8.stop();
            }
        }
    }, _marked[7], this);
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
function sync(path) {
    var mapEventToAction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var limit = arguments[2];

    var ref, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, type, action;

    return _regenerator2.default.wrap(function sync$(_context9) {
        while (1) {
            switch (_context9.prev = _context9.next) {
                case 0:
                    ref = typeof limit === 'number' ? firebase.database().ref(path).limitToLast(limit) : firebase.database().ref(path);
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context9.prev = 4;
                    _iterator = (0, _getIterator3.default)(EVENT_TYPES);

                case 6:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context9.next = 15;
                        break;
                    }

                    type = _step.value;
                    action = mapEventToAction[type];

                    if (!(typeof action === 'function')) {
                        _context9.next = 12;
                        break;
                    }

                    _context9.next = 12;
                    return (0, _effects.fork)(runSync, ref, type, action);

                case 12:
                    _iteratorNormalCompletion = true;
                    _context9.next = 6;
                    break;

                case 15:
                    _context9.next = 21;
                    break;

                case 17:
                    _context9.prev = 17;
                    _context9.t0 = _context9['catch'](4);
                    _didIteratorError = true;
                    _iteratorError = _context9.t0;

                case 21:
                    _context9.prev = 21;
                    _context9.prev = 22;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 24:
                    _context9.prev = 24;

                    if (!_didIteratorError) {
                        _context9.next = 27;
                        break;
                    }

                    throw _iteratorError;

                case 27:
                    return _context9.finish(24);

                case 28:
                    return _context9.finish(21);

                case 29:
                case 'end':
                    return _context9.stop();
            }
        }
    }, _marked[8], this, [[4, 17, 21, 29], [22,, 24, 28]]);
}