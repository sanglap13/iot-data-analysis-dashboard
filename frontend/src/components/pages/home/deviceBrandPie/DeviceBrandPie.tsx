import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../../utils/api/api";

import { DeviceBrandDataItem } from "../../../../@types/charts/pieChart.types";
import PieChart from "../../../shared/charts/pieChart/PieChart";
import "./deviceBrandPie.css";
import { apiData } from "../../../../@types/api/api.types";

interface DeviceBrandPieProps {
  apiData?: apiData;
}

const DeviceBrandPie = ({ apiData }: DeviceBrandPieProps) => {
  //for selecting device id
  const [deviceBrandZone, setDeviceBrandZone] = useState<string>("device_1");

  //for changing zone
  const handleDeviceBrandZoneChange = (event: SelectChangeEvent) => {
    setDeviceBrandZone(event.target.value as string);
  };

  const getDeviceBrandDistribution = () => {
    if (!apiData || !apiData.device_data) return [];

    // Filter data based on device_id
    const filteredData = apiData.device_data.filter(
      (item) => item.device_id === deviceBrandZone
    );

    // Aggregate data to calculate average values
    const aggregatedData = filteredData.reduce(
      (accumulator, currentItem, _, array) => {
        accumulator.temperature += currentItem.sensor_value.temperature;
        accumulator.humidity += currentItem.sensor_value.humidity;
        accumulator.other += currentItem.sensor_value.other;

        if (array.length - 1) {
          accumulator.temperature /= array.length;
          accumulator.humidity /= array.length;
          accumulator.other /= array.length;
        }
        return accumulator;
      },
      { temperature: 0, humidity: 0, other: 0 }
    );

    // Transform data into format suitable for Nivo Pie Chart
    const pieChartData = [
      {
        id: "temperature",
        label: "Temperature",
        value: Number(aggregatedData.temperature.toFixed(2)),
      },
      {
        id: "humidity",
        label: "Humidity",
        value: Number(aggregatedData.humidity.toFixed(2)),
      },
      {
        id: "other",
        label: "Other",
        value: Number(aggregatedData.other.toFixed(2)),
      },
    ];

    return pieChartData;
  };

  return (
    <div className="device-brand-pie-container">
      <div className="device-brand-pie-header">
        <h2>Device Average Data</h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Device</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={deviceBrandZone}
              label="Age"
              onChange={handleDeviceBrandZoneChange}
            >
              <MenuItem value={"device_1"}>Device 1</MenuItem>
              <MenuItem value={"device_2"}>Device 2</MenuItem>
              <MenuItem value={"device_3"}>Device 3</MenuItem>
              <MenuItem value={"device_4"}>Device 4</MenuItem>
              <MenuItem value={"device_5"}>Device 5</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <PieChart pieData={getDeviceBrandDistribution()} />
    </div>
  );
};

export default DeviceBrandPie;
