export interface sensorValueData {
  temperature: number;
  humidity: number;
  other: number;
}

export interface DeviceData {
  device_id: string;
  sensor_value: sensorValueData;
  timestamp: string;
}

interface metricsData {
  avg: number;
  max: number;
  min: number;
}

export type apiData = {
  device_data: DeviceData[];
  temperature: metricsData;
  humidity: metricsData;
  other: metricsData;
};

export type apiResponse = {
  data: apiData;
  msg: string;
  status: boolean;
};
