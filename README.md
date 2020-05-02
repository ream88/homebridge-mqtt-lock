# homebridge-mqtt-lock

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
rsync homebridge-plugin/* docker.local:/home/pi/homebridge/custom-plugins/mqtt-door-lock
```
