(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FirebaseSaga"] = factory();
	else
		root["FirebaseSaga"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.newKey = exports.VALUE = exports.CHILD_MOVED = exports.CHILD_CHANGED = exports.CHILD_REMOVED = exports.CHILD_ADDED = undefined;

	var _getIterator2 = __webpack_require__(15);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _slicedToArray2 = __webpack_require__(32);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _regenerator = __webpack_require__(33);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _defineProperty2 = __webpack_require__(31);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	exports.get = get;
	exports.getAll = getAll;
	exports.create = create;
	exports.update = update;
	exports.updateAll = updateAll;
	exports.push = push;
	exports.remove = remove;
	exports.sync = sync;

	var _reduxSaga = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"redux-saga\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _effects = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"redux-saga/effects\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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
	                    if (false) {
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(25)('wks')
	  , uid        = __webpack_require__(26)
	  , Symbol     = __webpack_require__(2).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(21)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(9)
	  , createDesc = __webpack_require__(23);
	module.exports = __webpack_require__(4) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = {};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(7)
	  , IE8_DOM_DEFINE = __webpack_require__(42)
	  , toPrimitive    = __webpack_require__(57)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(25)('keys')
	  , uid    = __webpack_require__(26);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(43)
	  , defined = __webpack_require__(10);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(34), __esModule: true };

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(17)
	  , TAG = __webpack_require__(1)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11)
	  , document = __webpack_require__(2).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(2)
	  , core      = __webpack_require__(3)
	  , ctx       = __webpack_require__(40)
	  , hide      = __webpack_require__(5)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(46)
	  , $export        = __webpack_require__(20)
	  , redefine       = __webpack_require__(52)
	  , hide           = __webpack_require__(5)
	  , has            = __webpack_require__(8)
	  , Iterators      = __webpack_require__(6)
	  , $iterCreate    = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(24)
	  , getPrototypeOf = __webpack_require__(49)
	  , ITERATOR       = __webpack_require__(1)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(9).f
	  , has = __webpack_require__(8)
	  , TAG = __webpack_require__(1)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(53)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(22)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	var global        = __webpack_require__(2)
	  , hide          = __webpack_require__(5)
	  , Iterators     = __webpack_require__(6)
	  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(35), __esModule: true };

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(30);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(29);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(15);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(63);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(28);
	__webpack_require__(27);
	module.exports = __webpack_require__(59);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(28);
	__webpack_require__(27);
	module.exports = __webpack_require__(60);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	var $Object = __webpack_require__(3).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(14)
	  , toLength  = __webpack_require__(55)
	  , toIndex   = __webpack_require__(54);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(37);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(4) && !__webpack_require__(21)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(17);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(47)
	  , descriptor     = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(24)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(5)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	module.exports = true;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(7)
	  , dPs         = __webpack_require__(48)
	  , enumBugKeys = __webpack_require__(19)
	  , IE_PROTO    = __webpack_require__(12)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(41).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(9)
	  , anObject = __webpack_require__(7)
	  , getKeys  = __webpack_require__(51);

	module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(8)
	  , toObject    = __webpack_require__(56)
	  , IE_PROTO    = __webpack_require__(12)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(8)
	  , toIObject    = __webpack_require__(14)
	  , arrayIndexOf = __webpack_require__(39)(false)
	  , IE_PROTO     = __webpack_require__(12)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(50)
	  , enumBugKeys = __webpack_require__(19);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(13)
	  , defined   = __webpack_require__(10);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(13)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(13)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(10);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(11);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(16)
	  , ITERATOR  = __webpack_require__(1)('iterator')
	  , Iterators = __webpack_require__(6);
	module.exports = __webpack_require__(3).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(7)
	  , get      = __webpack_require__(58);
	module.exports = __webpack_require__(3).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(16)
	  , ITERATOR  = __webpack_require__(1)('iterator')
	  , Iterators = __webpack_require__(6);
	module.exports = __webpack_require__(3).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(38)
	  , step             = __webpack_require__(45)
	  , Iterators        = __webpack_require__(6)
	  , toIObject        = __webpack_require__(14);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(22)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(20);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(4), 'Object', {defineProperty: __webpack_require__(9).f});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(64);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof global.process === "object" && global.process.domain) {
	      invoke = global.process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ })
/******/ ])
});
;