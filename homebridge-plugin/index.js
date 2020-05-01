"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Service, Characteristic;

function _default(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-mqtt-door-lock', 'MQTTDoorLock', MQTTDoorLock);
} // TODO: For now this is a (real) fake door


var MQTTDoorLock = /*#__PURE__*/function () {
  function MQTTDoorLock(log, config) {
    var _this = this;

    _classCallCheck(this, MQTTDoorLock);

    this.log = log;
    this.config = config;
    this.currentState = Characteristic.LockCurrentState.UNSECURED;
    this.targetState = Characteristic.LockTargetState.UNSECURED;
    this.lockService = new Service.LockMechanism(config.name);
    this.lockService.getCharacteristic(Characteristic.LockCurrentState).on('get', function (callback) {
      return callback(undefined, _this.currentState);
    });
    this.lockService.getCharacteristic(Characteristic.LockTargetState).on('get', function (callback) {
      return callback(undefined, _this.targetState);
    }).on('set', function (state, callback) {
      return _this.setLockTargetState(state, callback);
    });
  }

  _createClass(MQTTDoorLock, [{
    key: "setLockTargetState",
    value: function setLockTargetState(state, callback) {
      var _this2 = this;

      this.log("Setting state to ".concat(state, "\u2026"));
      this.targetState = state;
      this.lockService.getCharacteristic(Characteristic.LockTargetState).updateValue(state); // TODO: send request

      setTimeout(function () {
        _this2.currentState = state;

        _this2.lockService.getCharacteristic(Characteristic.LockCurrentState).updateValue(state);

        _this2.log("State set to ".concat(state, "!"));

        callback(); // Auto lock after x milliseconds

        if (_this2.config.autoLock && state === Characteristic.LockCurrentState.UNSECURED) {
          setTimeout(function () {
            _this2.lockService.setCharacteristic(Characteristic.LockTargetState, Characteristic.LockTargetState.SECURED);
          }, _this2.config.autoLockDelay || 60000);
        }
      }, 2000);
    }
  }, {
    key: "getServices",
    value: function getServices() {
      return [this.lockService];
    }
  }]);

  return MQTTDoorLock;
}();
