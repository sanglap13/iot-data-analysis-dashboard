from rest_framework import generics
from .models import DeviceData
from .serializers import DeviceDataSerializer
from django.db.models import Avg, Min, Max
from rest_framework.views import APIView
from rest_framework.response import Response

class DeviceDataCreateView(generics.CreateAPIView):
    queryset = DeviceData.objects.all()
    serializer_class = DeviceDataSerializer

class DeviceDataAnalyticsView(APIView):
    serializer_class = DeviceDataSerializer

    def get(self, request):
        queryset = DeviceData.objects.all()
        forattedData = DeviceDataSerializer(queryset, many=True).data
        print(forattedData)
        
        avg_value = queryset.aggregate(Avg('sensor_value'))['sensor_value__avg']
        min_value = queryset.aggregate(Min('sensor_value'))['sensor_value__min']
        max_value = queryset.aggregate(Max('sensor_value'))['sensor_value__max']
        
        response = {
            'data': forattedData,
            'avg_value': avg_value,
            'min_value': min_value,
            'max_value': max_value
        }
        return Response(response)
