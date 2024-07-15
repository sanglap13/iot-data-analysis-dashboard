from rest_framework import generics
from .models import DeviceData
from .serializers import DeviceDataSerializer
from django.db.models import Avg, Min, Max

class DeviceDataCreateView(generics.CreateAPIView):
    queryset = DeviceData.objects.all()
    serializer_class = DeviceDataSerializer

class DeviceDataAnalyticsView(generics.ListAPIView):
    serializer_class = DeviceDataSerializer

    def get_queryset(self):
        device_id = self.request.query_params.get('device_id')
        start_time = self.request.query_params.get('start_time')
        end_time = self.request.query_params.get('end_time')
        
        queryset = DeviceData.objects.filter(device_id=device_id, timestamp__range=[start_time, end_time])
        return queryset

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        data = response.data
        
        avg_value = self.get_queryset().aggregate(Avg('sensor_value'))['sensor_value__avg']
        min_value = self.get_queryset().aggregate(Min('sensor_value'))['sensor_value__min']
        max_value = self.get_queryset().aggregate(Max('sensor_value'))['sensor_value__max']
        
        response.data = {
            'data': data,
            'average': avg_value,
            'minimum': min_value,
            'maximum': max_value
        }
        return response
