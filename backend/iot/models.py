from django.db import models

# Create your models here.

class DeviceData(models.Model):
    device_id = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    temperature = models.FloatField()
    humidity = models.FloatField()
    other = models.FloatField()

    def __str__(self):
        return f"Device {self.device_id} - Temp: {self.temperature}, Humidity: {self.humidity}, Other: {self.other} at {self.timestamp}"

