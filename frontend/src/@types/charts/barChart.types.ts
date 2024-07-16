// bar Chart
type BarChartDataItem = {
  brand: string | number;
  count: number;
};
export type BarChartProps = {
  barData: BarChartDataItem[];
};

//Vehicle Brand Distribution
export type VehicleBrandDataItem = {
  vehicle_brand: string;
  zone: string;
};

//SDK Int Distribution
export type SdkIntDataItem = {
  sdk_int: number;
  zone: string;
};
