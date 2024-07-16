from django.db.models import Avg, Max, Min
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DeviceData
from .serializers import DeviceDataSerializer


class DeviceDataCreateView(APIView):

    def post(self, request):
        sensor_value = request.data.get('sensor_value', {})
        data = {
            'device_id': request.data.get('device_id'),
            'timestamp': request.data.get('timestamp'),
            'temperature': sensor_value.get('temperature'),
            'humidity': sensor_value.get('humidity'),
            'other': sensor_value.get('other')
        }
        queryset = DeviceData.objects.create(**data)
        serializer = DeviceDataSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeviceDataAnalyticsView(APIView):

    def get(self, request):
        try:
            queryset = DeviceData.objects.all()
            formattedData = DeviceDataSerializer(queryset, many=True).data
            
            avg_temperature = queryset.aggregate(Avg('temperature'))['temperature__avg']
            min_temperature = queryset.aggregate(Min('temperature'))['temperature__min']
            max_temperature = queryset.aggregate(Max('temperature'))['temperature__max']

            avg_humidity = queryset.aggregate(Avg('humidity'))['humidity__avg']
            min_humidity = queryset.aggregate(Min('humidity'))['humidity__min']
            max_humidity = queryset.aggregate(Max('humidity'))['humidity__max']

            avg_other = queryset.aggregate(Avg('other'))['other__avg']
            min_other = queryset.aggregate(Min('other'))['other__min']
            max_other = queryset.aggregate(Max('other'))['other__max']
            
            response = {
                    'data': {
                        'device_data': formattedData,
                        'temperature': {
                            'avg': avg_temperature,
                            'min': min_temperature,
                            'max': max_temperature
                        },
                        'humidity': {
                            'avg': avg_humidity,
                            'min': min_humidity,
                            'max': max_humidity
                        },
                        'other': {
                            'avg': avg_other,
                            'min': min_other,
                            'max': max_other
                        }
                    },
                    'msg': 'Data retrieved successfully',
                    'status': True
                }

            return Response(response, status=status.HTTP_200_OK)
        
        except Exception as e:
            error_response = {
                'msg': f'Error retrieving data: {str(e)}',
                'status': False
            }
            return Response(error_response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
