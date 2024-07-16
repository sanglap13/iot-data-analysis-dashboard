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

import "./vehicleCCPie.css";
import { VehicleCCDataItem } from "../../../../@types/charts/pieChart.types";
import PieChart from "../../../shared/charts/pieChart/PieChart";

const VehicleCCPie = () => {
  //for apiCall
  const [apiData, setApidata] = useState<VehicleCCDataItem[]>([]);
  //for selecting zone
  const [vehicleCCZone, setVehicleCCZone] = useState("Zone_1");

  //for changing zone
  const handleVehicleCCZoneChange = (event: SelectChangeEvent) => {
    setVehicleCCZone(event.target.value as string);
  };

  //fetching data from api or sessionStorage
  const getVehicleCCData = useCallback(async () => {
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
  const getVehicleCCDistribution = () => {
    // for filtering data based on zone
    const filteredData = apiData.filter((item) => item.zone === vehicleCCZone);

    // for Aggregating data to count occurrences of each device brand
    const brandDistribution = filteredData.reduce(
      (accumulator, currentItem) => {
        const brand = currentItem.vehicle_cc;
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

  useEffect(() => {
    getVehicleCCData();
  }, []);

  return (
    <div className="vehicle-cc-pie-container">
      <div className="vehicle-cc-pie-header">
        <h2>Vehicle CC</h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Zone</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={vehicleCCZone}
              label="Age"
              onChange={handleVehicleCCZoneChange}
            >
              <MenuItem value={"Zone_1"}>Zone 1</MenuItem>
              <MenuItem value={"Zone_2"}>Zone 2</MenuItem>
              <MenuItem value={"Zone_3"}>Zone 3</MenuItem>
              <MenuItem value={"Zone_4"}>Zone 4</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <PieChart pieData={getVehicleCCDistribution()} />
    </div>
  );
};

export default VehicleCCPie;
