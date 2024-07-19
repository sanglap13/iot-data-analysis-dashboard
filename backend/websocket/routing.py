from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/device_data/', consumers.DeviceDataConsumer.as_asgi()),
]
