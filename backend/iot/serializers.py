from rest_framework import serializers
from .models import DeviceData, SensorValue

class SensorValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorValue
        fields = ['temperature', 'humidity', 'other']

class DeviceDataSerializer(serializers.ModelSerializer):
    sensor_value = SensorValueSerializer()

    class Meta:
        model = DeviceData
        fields = ['device_id', 'timestamp', 'sensor_value']

    def create(self, validated_data):
        sensor_value_data = validated_data.pop('sensor_value')
        sensor_value = SensorValue.objects.create(**sensor_value_data)
        device_data = DeviceData.objects.create(sensor_value=sensor_value, **validated_data)
        return device_data