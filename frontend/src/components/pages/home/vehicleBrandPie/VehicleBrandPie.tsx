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

import "./vehicleBrandPie.css";
import { VehicleBrandDataItem } from "../../../../@types/charts/pieChart.types";
import PieChart from "../../../shared/charts/pieChart/PieChart";

const VehicleBrandPie = () => {
  //for apiCall
  const [apiData, setApidata] = useState<VehicleBrandDataItem[]>([]);
  //for selecting zone
  const [vehicleBrandZone, setVehicleBrandZone] = useState<string>("Zone_1");

  //for chnaging zone
  const handleVehicleBrandZoneChange = (event: SelectChangeEvent) => {
    setVehicleBrandZone(event.target.value as string);
  };

  //fetching data from api or sessionStorage
  const getVehicleData = useCallback(async () => {
    const storedData = sessionStorage.getItem("userData");
    let userData;

    if (storedData !== null) {
      userData = await JSON.parse(storedData);
    } else {
      userData = await api();
    }

    if (userData && userData.data) {
      const { data } = userData;
      setApidata(data);
      console.log("userData:", userData);
    } else {
      console.error("userData is undefined or does not contain data");
    }
  }, []);

  //for deviceBrand Distribution
  const getVehicleBrandDistribution = () => {
    // for filtering data based on zone
    const filteredData = apiData.filter(
      (item) => item.zone === vehicleBrandZone
    );

    // for Aggregating data to count occurrences of each device brand
    const brandDistribution = filteredData.reduce(
      (accumulator, currentItem) => {
        const brand = currentItem.vehicle_brand;
        accumulator[brand] = (accumulator[brand] || 0) + 1;
        return accumulator;
      },
      {} as { [key: string]: number }
    );

    // for Transforming data into format suitable for Nivo Pie Chart
    const pieChartData = Object.entries(brandDistribution).map(
      ([brand, count]) => ({
        id: brand,
        label: brand,
        value: count,
      })
    );
    return pieChartData;
  };

  //fetching data from api or sessionStorage
  useEffect(() => {
    getVehicleData();
  }, []);

  return (
    <div className="vehicle-brand-pie-container">
      <div className="vehicle-brand-pie-header">
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

      <PieChart pieData={getVehicleBrandDistribution()} />
    </div>
  );
};

export default VehicleBrandPie;
