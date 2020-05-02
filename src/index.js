const { connect } = require('mqtt')
const packageJson = require('../package.json')

let Service, Characteristic

module.exports = (homebridge) => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic

  homebridge.registerAccessory('MQTTLock', MQTTLock)
}

class MQTTLock {
  constructor (log, config) {
    this.log = log
    this.config = config

    this.informationService = new Service.AccessoryInformation()
    this.informationService
      .setCharacteristic(Characteristic.Manufacturer, packageJson.author.name)
      .setCharacteristic(Characteristic.Model, packageJson.name)
      .setCharacteristic(Characteristic.FirmwareRevision, packageJson.version)

    this.targetState = Characteristic.LockTargetState.UNKNOWN
    this.currentState = Characteristic.LockCurrentState.UNKNOWN

    this.lockService = new Service.LockMechanism(config.name)

    this.lockService
      .getCharacteristic(Characteristic.LockTargetState)
      .on('get', (callback) => callback(undefined, this.targetState))
      .on('set', (state, callback) => this.setLockTargetState(state, callback))

    this.lockService
      .getCharacteristic(Characteristic.LockCurrentState)
      .on('get', (callback) => callback(undefined, this.currentState))

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
  }

  setLockTargetState (state, callback) {
    this.targetState = state
    this.logTargetState()

    this.lockService.getCharacteristic(Characteristic.LockTargetState).updateValue(state)

    this.mqttClient.publish(this.config.setTopic, state.toString(), { qos: 2 }, (error) => {
      if (error) {
        callback(error)
      } else {
        this.currentState = state
        this.logCurrentState()

        this.lockService.getCharacteristic(Characteristic.LockCurrentState).updateValue(state)
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

  logTargetState () {
    switch (this.targetState) {
      case Characteristic.LockTargetState.SECURED:
        this.log('Locking...')
        break

      case Characteristic.LockTargetState.UNSECURED:
        this.log('Unlocking...')
        break

      default:
        break
    }
  }

  logCurrentState () {
    switch (this.currentState) {
      case Characteristic.LockCurrentState.SECURED:
        this.log('Locked!')
        break

      case Characteristic.LockCurrentState.UNSECURED:
        this.log('Unlocked!')
        break

      default:
        break
    }
  }
}
