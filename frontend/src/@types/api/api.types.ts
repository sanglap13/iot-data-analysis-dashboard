export interface DeviceData {
  device_id: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  other: number;
}

export type data = {
  device_data: DeviceData[];
  temperature: number;
  humidity: number;
  other: number;
};

export type apiResponse = {
  data: data;
  msg: string;
  status: boolean;
};
