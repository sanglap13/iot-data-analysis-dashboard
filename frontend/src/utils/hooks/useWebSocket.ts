import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8000/ws/device_data/";

export const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [deviceData, setDeviceData] = useState<any[]>([]); // Update this to match your data type

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data: ", data);

      // Assuming the data structure is like { "message": { ... } }
      if (data.message) {
        // Update the device data array with the new message
        setDeviceData((prevData) => [...prevData, data.message]);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return { socket, deviceData };
};
