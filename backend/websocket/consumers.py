import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from iot.models import SensorValue, DeviceData

class DeviceDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            "device_data",
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "device_data",
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        device_id = text_data_json['device_id']
        timestamp = text_data_json['timestamp']
        sensor_value_data = text_data_json['sensor_value']

        # Create sensor value and device data entries in the database
        await self.save_sensor_data(device_id, timestamp, sensor_value_data)

        await self.channel_layer.group_send(
            "device_data",
            {
                'type': 'device_data_message',
                'message': text_data_json
            }
        )

    async def device_data_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))

    @sync_to_async
    def save_sensor_data(self, device_id, timestamp, sensor_value_data):
        sensor_value = SensorValue.objects.create(
            temperature=sensor_value_data['temperature'],
            humidity=sensor_value_data['humidity'],
            other=sensor_value_data['other']
        )
        DeviceData.objects.create(
            device_id=device_id,
            timestamp=timestamp,
            sensor_value=sensor_value
        )
