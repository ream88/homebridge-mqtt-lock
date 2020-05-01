const { connect } = require('mqtt')
const packageJson = require('../package.json')

let Service, Characteristic

module.exports = (homebridge) => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic

  homebridge.registerAccessory('homebridge-mqtt-door-lock', 'MQTTDoorLock', MQTTDoorLock)
}

class MQTTDoorLock {
  constructor (log, config) {
    this.log = log
    this.config = config
    this.mqttClient = connect(`mqtt://${this.config.mqttBroker}`)

    this.mqttClient.on('connect', () => {
      this.mqttClient.subscribe(this.config.getTopic, (error) => {
        if (error) {
          this.log.error(error)
        }
      })
    })

    this.mqttClient.on('message', (_topic, message) => {
      message = message.toString()

      switch (message) {
        case '0':
          this.lockService.getCharacteristic(Characteristic.LockTargetState).updateValue(Characteristic.LockTargetState.UNSECURED)
          this.lockService.getCharacteristic(Characteristic.LockCurrentState).updateValue(Characteristic.LockCurrentState.UNSECURED)
          break

        case '1':
          this.lockService.getCharacteristic(Characteristic.LockTargetState).updateValue(Characteristic.LockTargetState.SECURED)
          this.lockService.getCharacteristic(Characteristic.LockCurrentState).updateValue(Characteristic.LockCurrentState.SECURED)
          break

        default:
          this.log.warn(`Got unknown message: ${message}`)
      }
    })

    this.targetState = Characteristic.LockTargetState.UNKNOWN
    this.currentState = Characteristic.LockCurrentState.UNKNOWN

    this.informationService = new Service.AccessoryInformation()
    this.informationService
      .setCharacteristic(Characteristic.Manufacturer, packageJson.author.name)
      .setCharacteristic(Characteristic.Model, packageJson.name)
      .setCharacteristic(Characteristic.FirmwareRevision, packageJson.version)

    this.lockService = new Service.LockMechanism(config.name)
    this.lockService
      .getCharacteristic(Characteristic.LockTargetState)
      .on('get', (callback) => callback(undefined, this.targetState))
      .on('set', (state, callback) => this.setLockTargetState(state, callback))
    this.lockService
      .getCharacteristic(Characteristic.LockCurrentState)
      .on('get', (callback) => callback(undefined, this.currentState))
  }

  setLockTargetState (state, callback) {
    this.log(`Setting state to ${state}…`)
    this.targetState = state
    this.lockService.getCharacteristic(Characteristic.LockTargetState).updateValue(state)

    this.mqttClient.publish(this.config.setTopic, state.toString(), { qos: 2 }, (error) => {
      if (error) {
        callback(error)
      } else {
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
      }
    })
  }

  getServices () {
    return [this.informationService, this.lockService]
  }
}
