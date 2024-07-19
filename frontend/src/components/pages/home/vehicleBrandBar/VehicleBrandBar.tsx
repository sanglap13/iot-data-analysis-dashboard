import { apiData } from "../../../../@types/api/api.types";
import BarChart from "../../../shared/charts/barChart/BarChart";
import "./vehicleBrandBar.css";

interface VehicleBrandBarProps {
  apiData?: apiData;
}

const VehicleBrandBar = ({ apiData }: VehicleBrandBarProps) => {
  const getVehicleBrandDistribution = () => {
    if (!apiData || !apiData.device_data) return [];

    // Aggregate data to count occurrences of each vehicle brand
    const brandDistribution = apiData.device_data.reduce(
      (accumulator, currentItem) => {
        const brand = currentItem.device_id;
        accumulator[brand] = (accumulator[brand] || 0) + 1;
        return accumulator;
      },
      {} as { [key: string]: number }
    );

    // Transform aggregated data into format suitable for Bar Chart
    const barChartData = Object.entries(brandDistribution).map(
      ([brand, count]) => ({
        brand,
        count,
      })
    );

    return barChartData;
  };

  return (
    <div className="vehicle-brand-bar-container">
      <div className="vehicle-brand-bar-header">
        <h2>Device Analysis</h2>
      </div>
      <div className="bar-chart-container">
        <BarChart barData={getVehicleBrandDistribution()} />
      </div>
    </div>
  );
};

export default VehicleBrandBar;
