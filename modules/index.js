'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.get = get;
exports.create = create;
exports.update = update;
exports.sync = sync;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _marked = [get, create, update, runSync, sync].map(regeneratorRuntime.mark);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function newOps() {
	var name = arguments.length <= 0 || arguments[0] === undefined ? 'data' : arguments[0];

	var ops = {};
	var chan = (0, _reduxSaga.eventChannel)(function (emit) {
		ops.handler = function (obj) {
			emit(_defineProperty({}, name, obj));
		};
		return function () {};
	});
	chan.handler = ops.handler;
	return ch;
}

function newKey(path) {
	return firebase.database().ref().child(path).push().key;
}

function get(path, key) {
	var ops, ref, data;
	return regeneratorRuntime.wrap(function get$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					ops = newOps('error');
					ref = firebase.database().ref(path + '/' + key);
					_context.next = 4;
					return (0, _effects.call)([ref, ref.once], 'value');

				case 4:
					data = _context.sent;
					return _context.abrupt('return', data.val());

				case 6:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}

function create(path, fn) {
	var key, payload, ops, ref, _ref, _ref2, _, error;

	return regeneratorRuntime.wrap(function create$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					_context2.next = 2;
					return (0, _effects.call)(newKey, path);

				case 2:
					key = _context2.sent;
					_context2.next = 5;
					return (0, _effects.call)(fn, key);

				case 5:
					payload = _context2.sent;
					ops = newOps('error');
					ref = firebase.database().ref();
					_context2.next = 10;
					return [(0, _effects.call)([ref, ref.update], payload, ops.handler), (0, _effects.take)(ops)];

				case 10:
					_ref = _context2.sent;
					_ref2 = _slicedToArray(_ref, 2);
					_ = _ref2[0];
					error = _ref2[1].error;
					return _context2.abrupt('return', error);

				case 15:
				case 'end':
					return _context2.stop();
			}
		}
	}, _marked[1], this);
}

function update(path, key, payload) {
	var ops, ref, _ref3, _ref4, _, error;

	return regeneratorRuntime.wrap(function update$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					if (!(typeof payload === 'function')) {
						_context3.next = 4;
						break;
					}

					_context3.next = 3;
					return (0, _effects.call)(payload);

				case 3:
					payload = _context3.sent;

				case 4:
					ops = newOps('error');
					ref = firebase.database().ref(path + '/' + key);
					_context3.next = 8;
					return [(0, _effects.call)([ref, ref.update], payload, ops.handler), (0, _effects.take)(ops)];

				case 8:
					_ref3 = _context3.sent;
					_ref4 = _slicedToArray(_ref3, 2);
					_ = _ref4[0];
					error = _ref4[1].error;
					return _context3.abrupt('return', error);

				case 13:
				case 'end':
					return _context3.stop();
			}
		}
	}, _marked[2], this);
}

function runSync(ref, eventType, creator) {
	var ops, _ref5, data;

	return regeneratorRuntime.wrap(function runSync$(_context4) {
		while (1) {
			switch (_context4.prev = _context4.next) {
				case 0:
					ops = newOps();
					_context4.next = 3;
					return (0, _effects.call)([ref, ref.on], eventType, ops.handler);

				case 3:
					if (!true) {
						_context4.next = 12;
						break;
					}

					_context4.next = 6;
					return (0, _effects.take)(ops);

				case 6:
					_ref5 = _context4.sent;
					data = _ref5.data;
					_context4.next = 10;
					return (0, _effects.put)(creator({ data: data }));

				case 10:
					_context4.next = 3;
					break;

				case 12:
				case 'end':
					return _context4.stop();
			}
		}
	}, _marked[3], this);
}

var EVENT_TYPES = ['child_added', 'child_removed'];
function sync(path) {
	var mapEventToAction = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var ref, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, type, action;

	return regeneratorRuntime.wrap(function sync$(_context5) {
		while (1) {
			switch (_context5.prev = _context5.next) {
				case 0:
					ref = firebase.database().ref(path).limitToLast(20);
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					_context5.prev = 4;
					_iterator = EVENT_TYPES[Symbol.iterator]();

				case 6:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						_context5.next = 15;
						break;
					}

					type = _step.value;
					action = mapEventToAction[type];

					if (!(typeof action === 'function')) {
						_context5.next = 12;
						break;
					}

					_context5.next = 12;
					return (0, _effects.fork)(runSync, ref, type, action);

				case 12:
					_iteratorNormalCompletion = true;
					_context5.next = 6;
					break;

				case 15:
					_context5.next = 21;
					break;

				case 17:
					_context5.prev = 17;
					_context5.t0 = _context5['catch'](4);
					_didIteratorError = true;
					_iteratorError = _context5.t0;

				case 21:
					_context5.prev = 21;
					_context5.prev = 22;

					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}

				case 24:
					_context5.prev = 24;

					if (!_didIteratorError) {
						_context5.next = 27;
						break;
					}

					throw _iteratorError;

				case 27:
					return _context5.finish(24);

				case 28:
					return _context5.finish(21);

				case 29:
				case 'end':
					return _context5.stop();
			}
		}
	}, _marked[4], this, [[4, 17, 21, 29], [22,, 24, 28]]);
}