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
    this.lockService.getCharacteristic(Characteristic.LockCurrentState).on('get', function () {
      return _this.getLockCurrentState();
    });
    this.lockService.getCharacteristic(Characteristic.LockTargetState).on('get', function () {
      return _this.getLockTargetState();
    }).on('set', function (state) {
      return _this.setLockTargetState(state);
    });
  }

  _createClass(MQTTDoorLock, [{
    key: "getLockCurrentState",
    value: function getLockCurrentState() {
      return this.currentState;
    }
  }, {
    key: "getLockTargetState",
    value: function getLockTargetState() {
      return this.targetState;
    }
  }, {
    key: "setLockTargetState",
    value: function setLockTargetState(state) {
      var _this2 = this;

      this.log("Setting state to ".concat(state));
      this.lockService.setCharacteristic(Characteristic.LockCurrentState, state);
      this.targetState = state; // TODO: send request

      setTimeout(function () {
        _this2.currentState = state;
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
