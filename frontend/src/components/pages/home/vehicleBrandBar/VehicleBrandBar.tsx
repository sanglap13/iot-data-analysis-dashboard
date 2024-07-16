import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { api } from "../../../../utils/api/api";

import "./vehicleBrandBar.css";
import { VehicleBrandDataItem } from "../../../../@types/charts/barChart.types";
import BarChart from "../../../shared/charts/barChart/BarChart";

const VehicleBrandBar = () => {
  //for apiCall
  const [apiData, setApiData] = useState<VehicleBrandDataItem[]>([]);
  //for selecting zone
  const [vehicleBrandZone, setVehicleBrandZone] = useState("Zone_1");

  //for changing zone
  const handleVehicleBrandZoneChange = (event: SelectChangeEvent) => {
    setVehicleBrandZone(event.target.value as string);
  };

  //fetching data from api or sessionStorage
  const getVehicleBrandData = useCallback(async () => {
    const storedData = sessionStorage.getItem("userData");
    let userData;

    if (storedData !== null) {
      userData = await JSON.parse(storedData);
    } else {
      userData = await api();
    }

    if (userData && userData.data) {
      const { data } = userData;
      setApiData(data);
      console.log("userData:", userData);
    } else {
      console.error("userData is undefined or does not contain data");
    }
  }, []);

  const getVehicleBrandDistribution = () => {
    // Filter data based on selected zone
    const filteredData = apiData.filter(
      (item) => item.zone === vehicleBrandZone
    );

    // Aggregate data to count occurrences of each vehicle brand
    const brandDistribution = filteredData.reduce(
      (accumulator, currentItem) => {
        const brand = currentItem.vehicle_brand;
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

  //fetching data from api or sessionStorage
  useEffect(() => {
    getVehicleBrandData();
  }, []);

  return (
    <div className="vehicle-brand-bar-container">
      <div className="vehicle-brand-bar-header">
        <h2>Vehicle Brand</h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Zone</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={vehicleBrandZone}
              label="Age"
              onChange={handleVehicleBrandZoneChange}
            >
              <MenuItem value={"Zone_1"}>Zone 1</MenuItem>
              <MenuItem value={"Zone_2"}>Zone 2</MenuItem>
              <MenuItem value={"Zone_3"}>Zone 3</MenuItem>
              <MenuItem value={"Zone_4"}>Zone 4</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="bar-chart-container">
        <BarChart barData={getVehicleBrandDistribution()} />
      </div>
    </div>
  );
};

export default VehicleBrandBar;
