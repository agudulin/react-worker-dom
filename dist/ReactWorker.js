/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ReactWorkerDom = undefined;
	
	var _WorkerDomNodeImpl = __webpack_require__(65);
	
	var _WorkerDomNodeImpl2 = _interopRequireDefault(_WorkerDomNodeImpl);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ReactWorkerDom = exports.ReactWorkerDom = (function () {
	    function ReactWorkerDom(worker, container) {
	        var _this = this;
	
	        _classCallCheck(this, ReactWorkerDom);
	
	        this.nodeList = {};
	        this.worker = worker;
	        this.container = container;
	        worker.onmessage = function (e) {
	            return _this.handleMessage(e.data);
	        };
	    }
	
	    _createClass(ReactWorkerDom, [{
	        key: 'handleMessage',
	        value: function handleMessage(data) {
	            var _this2 = this;
	
	            if (data.type === 'renderQueue') {
	                data.args.forEach(function (msg) {
	                    return _this2.handleRenderQueueMessage(msg);
	                });
	            }
	        }
	    }, {
	        key: 'handleRenderQueueMessage',
	        value: function handleRenderQueueMessage(data) {
	            var nodeList = this.nodeList;
	            switch (data.method) {
	                case 'constructor':
	                    nodeList[data.id] = new (Function.prototype.bind.apply(_WorkerDomNodeImpl2.default, [null].concat([data.id], _toConsumableArray(data.args))))();
	                    break;
	                case 'render':
	                    // Should only be called once per worker
	                    this.container.appendChild(nodeList[data.id].ref);
	                    break;
	                case 'appendChild':
	                    var node = nodeList[data.id];
	                    node.appendChild(nodeList[data.args[0]]);
	                    break;
	                default:
	                    var node = nodeList[data.id];
	                    if (typeof node[data.method] === 'function') {
	                        node[data.method].apply(node, _toConsumableArray(data.args));
	                    } else {
	                        console.log('Cannot run %s on Node with id %s', data.method, data.id);
	                    }
	            }
	        }
	    }]);
	
	    return ReactWorkerDom;
	})();
	
	window.ReactWorker = ReactWorkerDom;

/***/ },

/***/ 65:
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var WorkerDomNodeImpl = (function () {
	    function WorkerDomNodeImpl(id, el, options) {
	        _classCallCheck(this, WorkerDomNodeImpl);
	
	        this.el = el;
	        this.options = options;
	        this.id = id;
	        if (el === '#text') {
	            this.ref = document.createTextNode(options.value);
	            this.type = 'TEXT_NODE';
	        } else {
	            this.ref = document.createElement(el);
	            this.ref.setAttribute('data-reactid', id);
	            this.setAttributes(this.options);
	        }
	    }
	
	    _createClass(WorkerDomNodeImpl, [{
	        key: 'appendChild',
	        value: function appendChild(node) {
	            this.ref.appendChild(node.ref);
	        }
	    }, {
	        key: 'setContent',
	        value: function setContent(content) {
	            if (this.type === 'TEXT_NODE') {
	                this.ref.nodeValue = content;
	            } else {
	                this.ref.innerHTML = escape(content);
	            }
	        }
	    }, {
	        key: 'setAttributes',
	        value: function setAttributes(options) {
	            for (var key in options) {
	                var value = options[key];
	                if (key === 'className') {
	                    this.ref.className = value;
	                } else {
	                    this.ref.setAttribute(key, value);
	                }
	            }
	        }
	    }, {
	        key: 'addEventHandlers',
	        value: function addEventHandlers() {
	            var _this = this;
	
	            for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
	                handlers[_key] = arguments[_key];
	            }
	
	            handlers.forEach(function (handler) {
	                _this.ref.addEventListener(handler.substring(2).toLowerCase(), function (e) {
	                    _this.onEvent(handler, e);
	                    return false;
	                }, false);
	            });
	        }
	    }, {
	        key: 'onEvent',
	        value: function onEvent(eventType, e) {
	            // TODO Send event back to worker
	            // TODO Convert event to Synthetic Event
	        }
	    }]);
	
	    return WorkerDomNodeImpl;
	})();
	
	exports.default = WorkerDomNodeImpl;

/***/ }

/******/ });
//# sourceMappingURL=ReactWorker.js.map