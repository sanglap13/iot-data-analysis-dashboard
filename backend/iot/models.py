from django.db import models

# Create your models here.
class SensorValue(models.Model):
    temperature = models.FloatField()
    humidity = models.FloatField()
    other = models.FloatField()

    def __str__(self):
        return f"Temp: {self.temperature}, Humidity: {self.humidity}, Other: {self.other}"

class DeviceData(models.Model):
    device_id = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    sensor_value = models.OneToOneField(SensorValue, on_delete=models.CASCADE)

    def __str__(self):
        return f"Device {self.device_id} - {self.sensor_value} at {self.timestamp}"