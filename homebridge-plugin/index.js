(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, author, keywords, scripts, engines, devDependencies, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"name\\\":\\\"homebridge-mqtt-door-lock\\\",\\\"version\\\":\\\"0.0.1\\\",\\\"author\\\":{\\\"name\\\":\\\"Mario Uher\\\",\\\"email\\\":\\\"uher.mario@gmail.com\\\"},\\\"keywords\\\":[\\\"homebridge-plugin\\\"],\\\"scripts\\\":{\\\"build\\\":\\\"webpack -p\\\",\\\"lint\\\":\\\"standard --fix src/index.js webpack.config.js\\\",\\\"start\\\":\\\"webpack --watch\\\"},\\\"engines\\\":{\\\"node\\\":\\\">=10.0.0\\\",\\\"homebridge\\\":\\\">=0.2.0\\\"},\\\"devDependencies\\\":{\\\"@babel/cli\\\":\\\"^7.8.4\\\",\\\"@babel/core\\\":\\\"^7.9.0\\\",\\\"@babel/preset-env\\\":\\\"^7.9.5\\\",\\\"babel-loader\\\":\\\"^8.1.0\\\",\\\"standard\\\":\\\"^14.3.3\\\",\\\"webpack\\\":\\\"^4.43.0\\\",\\\"webpack-cli\\\":\\\"^3.3.11\\\"}}\");\n\n//# sourceURL=webpack:///./package.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ \"./package.json\");\nvar _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../package.json */ \"./package.json\", 1);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar Service, Characteristic;\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (homebridge) {\n  Service = homebridge.hap.Service;\n  Characteristic = homebridge.hap.Characteristic;\n  homebridge.registerAccessory('homebridge-mqtt-door-lock', 'MQTTDoorLock', MQTTDoorLock);\n}); // TODO: For now this is a (real) fake door\n\nvar MQTTDoorLock = /*#__PURE__*/function () {\n  function MQTTDoorLock(log, config) {\n    var _this = this;\n\n    _classCallCheck(this, MQTTDoorLock);\n\n    this.log = log;\n    this.config = config;\n    this.currentState = Characteristic.LockCurrentState.UNSECURED;\n    this.targetState = Characteristic.LockTargetState.UNSECURED;\n    this.informationService = new Service.AccessoryInformation();\n    this.informationService.setCharacteristic(Characteristic.Manufacturer, _package_json__WEBPACK_IMPORTED_MODULE_0__.author.name).setCharacteristic(Characteristic.Model, _package_json__WEBPACK_IMPORTED_MODULE_0__.name).setCharacteristic(Characteristic.FirmwareRevision, _package_json__WEBPACK_IMPORTED_MODULE_0__.version);\n    this.lockService = new Service.LockMechanism(config.name);\n    this.lockService.getCharacteristic(Characteristic.LockCurrentState).on('get', function (callback) {\n      return callback(undefined, _this.currentState);\n    });\n    this.lockService.getCharacteristic(Characteristic.LockTargetState).on('get', function (callback) {\n      return callback(undefined, _this.targetState);\n    }).on('set', function (state, callback) {\n      return _this.setLockTargetState(state, callback);\n    });\n  }\n\n  _createClass(MQTTDoorLock, [{\n    key: \"setLockTargetState\",\n    value: function setLockTargetState(state, callback) {\n      var _this2 = this;\n\n      this.log(\"Setting state to \".concat(state, \"\\u2026\"));\n      this.targetState = state;\n      this.lockService.getCharacteristic(Characteristic.LockTargetState).updateValue(state); // TODO: send request\n\n      setTimeout(function () {\n        _this2.currentState = state;\n\n        _this2.lockService.getCharacteristic(Characteristic.LockCurrentState).updateValue(state);\n\n        _this2.log(\"State set to \".concat(state, \"!\"));\n\n        callback(); // Auto lock after x milliseconds\n\n        if (_this2.config.autoLock && state === Characteristic.LockCurrentState.UNSECURED) {\n          setTimeout(function () {\n            _this2.lockService.setCharacteristic(Characteristic.LockTargetState, Characteristic.LockTargetState.SECURED);\n          }, _this2.config.autoLockDelay || 60000);\n        }\n      }, 2000);\n    }\n  }, {\n    key: \"getServices\",\n    value: function getServices() {\n      return [this.informationService, this.lockService];\n    }\n  }]);\n\n  return MQTTDoorLock;\n}();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ })));