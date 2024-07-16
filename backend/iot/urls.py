from django.urls import path
from .views import DeviceDataAnalyticsView

urlpatterns = [
    path('analytics/', DeviceDataAnalyticsView.as_view(), name='device_data_analytics'),
]
