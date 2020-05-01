# homebridge-mqtt-door-lock

## Usage

```json
{
  "bridge": {
      "name": "Homebridge",
      "username": "0E:49:59:E7:CB:45",
      "port": 51415,
      "pin": "111-11-111"
  },
  "accessories": [{
    "accessory": "MQTTDoorLock",
    "name": "Front Door"
  }],
  "platforms": []
}
```

## Development

During development `rsync` helped a lot with syncing the plugin to my Raspberry Pi.

```sh
rsync homebridge-plugin/* docker.local:/home/pi/homebridge/custom-plugins/mqtt-door-lock
```
