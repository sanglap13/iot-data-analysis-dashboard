//stacked bar chart
type StackedBarChartData = {
  zone: string;
  vehicleCCCount: number;
  sdkIntCount: number;
};

export type StackedBarChartProps = {
  data: StackedBarChartData[];
};
// type StackedBarChartData = {
//   [key: string]: number;
// };

// export type StackedBarChartDataProps = {
//   vehicleCCData: StackedBarChartData;
//   sdkIntData: StackedBarChartData;
// };

//Vehicle n SDK Distribution
export type VehicleDataItem = {
  vehicle_cc: string;
  sdk_int: number;
  zone: string;
};
export type StackedBarChartDataFormat = {
  zone: string;
  vehicleCCCount: number;
  sdkIntCount: number;
};
