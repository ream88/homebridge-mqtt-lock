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

    this.log('Hello Adam Ben')

    this.currentState = Characteristic.LockCurrentState.UNSECURED
    this.targetState = Characteristic.LockTargetState.UNSECURED

    this.lockService = new Service.LockMechanism(config.name)

    this.lockService
      .getCharacteristic(Characteristic.LockCurrentState)
      .on('get', () => this.getLockCurrentState())

    this.lockService
      .getCharacteristic(Characteristic.LockTargetState)
      .on('get', () => this.getLockTargetState())
      .on('set', (state, callback) => this.setLockTargetState(state, callback))
  }

  getLockCurrentState () {
    return this.currentState
  }

  getLockTargetState () {
    return this.targetState
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

  getServices() {
    return [this.lockService]
  }
}
