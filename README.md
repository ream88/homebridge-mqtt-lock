# homebridge-mqtt-lock

An auto-locking homebridge lock using MQTT.

## Usage

```json
{
  "accessories": [
    {
      "accessory": "MQTTLock",
      "name": "RealFakeDoor",
      "autoLock": true,
      "autoLockDelay": 10000,
      "mqttBroker": "127.0.0.1",
      "getTopic": "RealFakeDoor/Get",
      "setTopic": "RealFakeDoor/Set"
    }
  ]
}
```

## Development

During development `rsync` helped a lot with syncing the plugin to my Raspberry Pi.

```sh
rsync -r --exclude 'node_modules' . docker.local:/home/pi/homebridge/custom-plugins/homebridge-mqtt-lock
```

## License

MIT License
