import requests
import random
import time
from datetime import datetime

# URL of the backend endpoint to send data to
URL = 'http://localhost:8000/api/iot/data/' 

# List of simulated device IDs
DEVICE_IDS = ['device_1', 'device_2', 'device_3', 'device_4', 'device_5']

def generate_data():
    while True:
        # Choose a random device ID
        device_id = random.choice(DEVICE_IDS)
        
        # Generate random sensor value
        sensor_value = random.uniform(0.0, 100.0)
        
        # Current timestamp
        timestamp = datetime.now().isoformat()
        
        # Create data payload
        data = {
            'device_id': device_id,
            'timestamp': timestamp,
            'sensor_value': sensor_value
        }
        
     
        response = requests.post(URL, json=data)
        
      
        if response.status_code == 201:
            print(f'Successfully sent data: {data}')
        else:
            print(f'Failed to send data: {response.text}')
        
        
        time.sleep(5)

if __name__ == "__main__":
    generate_data()
