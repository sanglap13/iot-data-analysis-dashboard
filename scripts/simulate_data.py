import requests
import time
import random

# Replace with your actual backend URL
url = 'http://localhost:8000/api/iot/data/'

while True:
    data = {
        'device_id': 'device_1',
        'sensor_value': random.uniform(20.0, 30.0)  # Simulate a sensor value between 20.0 and 30.0
    }
    response = requests.post(url, data=data)
    print(response.status_code, response.json())
    time.sleep(5)  # Send a data point every 5 seconds
