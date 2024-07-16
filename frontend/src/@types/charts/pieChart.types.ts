// Pie Chart
type PieChartDataItem = {
  id: string;
  label: string;
  value: number;
};
export type PieChartProps = {
  pieData: PieChartDataItem[];
};

// Device Brand Distribution
export type DeviceBrandDataItem = {
  device_brand: string;
  zone: string;
};

//Vehicle Brand Distribution
export type VehicleBrandDataItem = {
  vehicle_brand: string;
  zone: string;
};

//Vehicle Brand Distribution
export type VehicleCCDataItem = {
  vehicle_cc: string;
  zone: string;
};
