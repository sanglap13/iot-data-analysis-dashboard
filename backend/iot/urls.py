from django.urls import path
from .views import DeviceDataCreateView, DeviceDataAnalyticsView

urlpatterns = [
    path('data/', DeviceDataCreateView.as_view(), name='device_data_create'),
    path('analytics/', DeviceDataAnalyticsView.as_view(), name='device_data_analytics'),
]
