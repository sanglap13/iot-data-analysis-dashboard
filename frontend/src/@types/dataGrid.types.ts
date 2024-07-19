import { sensorValueData } from "./api/api.types";

export type UserDataGridInfo = {
  device_id: string;
  sensor_value: sensorValueData;
  timestamp: string;
};

export type FlattenedUserDataGridInfo = {
  device_id: string;
  temperature: number;
  humidity: number;
  other: number;
  timestamp: string;
};
