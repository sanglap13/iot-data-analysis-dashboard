from django.db import models

# Create your models here.

class DeviceData(models.Model):
    device_id = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    sensor_value = models.FloatField()

    def __str__(self):
        return f"Device {self.device_id} - {self.sensor_value} at {self.timestamp}"

