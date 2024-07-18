from django.db.models import Avg, Max, Min
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DeviceData, SensorValue
from .serializers import DeviceDataSerializer, SensorValueSerializer


class DeviceDataCreateView(APIView):

    # def post(self, request):
    #     sensor_value_data = request.data.get('sensor_value', {})
    #     data = {
    #         'device_id': request.data.get('device_id'),
    #         'timestamp': request.data.get('timestamp'),
    #         'sensor_value': sensor_value_data

    #     }
    #     # queryset = DeviceData.objects.create(**data)
    #     serializer = DeviceDataSerializer(data=data)
    #     if serializer.is_valid():
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def post(self, request):
    #     print("Received request data:", request.data)  # Print the received request data

    #     sensor_value_data = request.data.get('sensor_value', {})
    #     sensor_value_serializer = SensorValueSerializer(data=sensor_value_data)
        
    #     if sensor_value_serializer.is_valid():
    #         sensor_value = sensor_value_serializer.save()
    #         device_data = {
    #             'device_id': request.data.get('device_id'),
    #             'timestamp': request.data.get('timestamp'),
    #             'sensor_value': sensor_value.id
    #         }
    #         device_data_serializer = DeviceDataSerializer(data=device_data)
    #         if device_data_serializer.is_valid():
    #             device_data_serializer.save()
    #             print("Saved data:", device_data_serializer.data)  # Print the saved data
    #             return Response(device_data_serializer.data, status=status.HTTP_201_CREATED)
    #         print("Errors in DeviceData:", device_data_serializer.errors)  # Print any errors in DeviceData
    #         return Response(device_data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     print("Errors in SensorValue:", sensor_value_serializer.errors)  # Print any errors in SensorValue
    #     return Response(sensor_value_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def post(self, request):
        print("Received request data:", request.data)  # Print the received request data

        serializer = DeviceDataSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            print("Saved data:", serializer.data)  # Print the saved data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("Errors in DeviceData:", serializer.errors)  # Print any errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeviceDataAnalyticsView(APIView):

    def get(self, request):
        try:
            queryset = DeviceData.objects.all()
            formattedData = DeviceDataSerializer(queryset, many=True).data
            
            # avg_temperature = queryset.aggregate(Avg('temperature'))['temperature__avg']
            # min_temperature = queryset.aggregate(Min('temperature'))['temperature__min']
            # max_temperature = queryset.aggregate(Max('temperature'))['temperature__max']

            # avg_humidity = queryset.aggregate(Avg('humidity'))['humidity__avg']
            # min_humidity = queryset.aggregate(Min('humidity'))['humidity__min']
            # max_humidity = queryset.aggregate(Max('humidity'))['humidity__max']

            # avg_other = queryset.aggregate(Avg('other'))['other__avg']
            # min_other = queryset.aggregate(Min('other'))['other__min']
            # max_other = queryset.aggregate(Max('other'))['other__max']
            avg_temperature = queryset.aggregate(Avg('sensor_value__temperature'))['sensor_value__temperature__avg']
            min_temperature = queryset.aggregate(Min('sensor_value__temperature'))['sensor_value__temperature__min']
            max_temperature = queryset.aggregate(Max('sensor_value__temperature'))['sensor_value__temperature__max']

            avg_humidity = queryset.aggregate(Avg('sensor_value__humidity'))['sensor_value__humidity__avg']
            min_humidity = queryset.aggregate(Min('sensor_value__humidity'))['sensor_value__humidity__min']
            max_humidity = queryset.aggregate(Max('sensor_value__humidity'))['sensor_value__humidity__max']

            avg_other = queryset.aggregate(Avg('sensor_value__other'))['sensor_value__other__avg']
            min_other = queryset.aggregate(Min('sensor_value__other'))['sensor_value__other__min']
            max_other = queryset.aggregate(Max('sensor_value__other'))['sensor_value__other__max']
            
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
