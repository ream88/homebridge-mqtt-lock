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
      .on('get', (callback) => this.getLockCurrentState(callback))

    this.lockService
      .getCharacteristic(Characteristic.LockTargetState)
      .on('get', (callback) => this.getLockTargetState(callback))
      .on('set', (state, callback) => this.setLockTargetState(state, callback))
  }

  getLockCurrentState (callback) {
    callback(undefined, this.currentState)
  }

  getLockTargetState (callback) {
    callback(undefined, this.targetState)
  }

  setLockTargetState (state, callback) {
    this.log(`Setting state to ${state}`)

    this.lockService.setCharacteristic(Characteristic.LockCurrentState, state)
    this.targetState = state

    // TODO: send request
    setTimeout(() => {
      this.currentState = state
      callback()
    }, 2000)
  }

  getServices () {
    return [this.lockService]
  }
}
