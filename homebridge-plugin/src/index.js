let Service, Characteristic

export default function (homebridge) {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic

  homebridge.registerAccessory('homebridge-mqtt-door-lock', 'MQTTDoorLock', MQTTDoorLock)
}

// TODO: For now this is a (real) fake door
class MQTTDoorLock {
  constructor (log, config) {
    this.log = log
    this.config = config

    this.currentState = Characteristic.LockCurrentState.UNSECURED
    this.targetState = Characteristic.LockTargetState.UNSECURED

    this.lockService = new Service.LockMechanism(config.name)

    this.lockService
      .getCharacteristic(Characteristic.LockCurrentState)
      .on('get', (callback) => callback(undefined, this.currentState))

    this.lockService
      .getCharacteristic(Characteristic.LockTargetState)
      .on('get', (callback) => callback(undefined, this.targetState))
      .on('set', (state, callback) => this.setLockTargetState(state, callback))
  }

  setLockTargetState (state, callback) {
    this.log(`Setting state to ${state}…`)
    this.targetState = state
    this.lockService.getCharacteristic(Characteristic.LockTargetState).updateValue(state)

    // TODO: send request
    setTimeout(() => {
      this.currentState = state
      this.lockService.getCharacteristic(Characteristic.LockCurrentState).updateValue(state)
      this.log(`State set to ${state}!`)

      callback()

      // Auto lock after x milliseconds
      if (this.config.autoLock && state === Characteristic.LockCurrentState.UNSECURED) {
        setTimeout(() => {
          this.lockService.setCharacteristic(Characteristic.LockTargetState, Characteristic.LockTargetState.SECURED)
        }, this.config.autoLockDelay || 60000)
      }
    }, 2000)
  }

  getServices () {
    return [this.lockService]
  }
}
