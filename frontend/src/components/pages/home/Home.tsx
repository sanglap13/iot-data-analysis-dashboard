import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeviceBrandPie from "./deviceBrandPie/DeviceBrandPie";
import VehicleBrandBar from "./vehicleBrandBar/VehicleBrandBar";

import { useCallback, useEffect, useState } from "react";
import { apiData } from "../../../@types/api/api.types";
import { api } from "../../../utils/api/api";
import { roundToBeforeDecimal } from "../../../utils/commonFunctions/roundToBeforeDecimal";
import TopCard from "../../shared/topCard/TopCard";
import UserInfoGrid from "../../shared/userInfoGrid/UserInfoGrid";
import "./home.css";

const Home = () => {
  const [apiData, setApiData] = useState<apiData>();
  const navigate = useNavigate();

  const getApiData = useCallback(async () => {
    const userData = await api();

    if (userData) {
      setApiData(userData);
      console.log("userData:", userData);
    } else {
      console.error("userData is undefined or does not contain data");
    }
  }, []);

  useEffect(() => {
    getApiData();
  }, [getApiData]);

  return (
    <div className="home">
      <div className="cards-container">
        <div className="text-message">Welcome!!</div>
        <TopCard
          bgColor={"#f1e15b"}
          title={"Temperature"}
          avg={roundToBeforeDecimal(apiData?.temperature?.avg as number)}
          max={roundToBeforeDecimal(apiData?.temperature?.max as number)}
          min={roundToBeforeDecimal(apiData?.temperature?.min as number)}
        />
        <TopCard
          bgColor={"#f47560"}
          title={"Humidity"}
          avg={roundToBeforeDecimal(apiData?.humidity?.avg as number)}
          max={roundToBeforeDecimal(apiData?.humidity?.max as number)}
          min={roundToBeforeDecimal(apiData?.humidity?.min as number)}
        />
        <TopCard
          bgColor={"#f47560"}
          title={"Other"}
          avg={roundToBeforeDecimal(apiData?.other?.avg as number)}
          max={roundToBeforeDecimal(apiData?.other?.max as number)}
          min={roundToBeforeDecimal(apiData?.other?.min as number)}
        />
      </div>
      <div className="middle-container">
        <div className="data-table">
          <div className="data-table-header">
            <h1 className="title">Device Data</h1>
            <IconButton onClick={() => navigate("/users")}>
              <OpenInNewIcon />
            </IconButton>
          </div>
          <UserInfoGrid />
        </div>
        <div className="charts">
          <div className="pie-chart">
            <DeviceBrandPie apiData={apiData} />
          </div>
          <div className="bar-chart">
            <VehicleBrandBar apiData={apiData} />
          </div>
        </div>
      </div>
      {/* <div className="bottom-container">
        <div className="bottom-charts">
          <SdkIntBar />
        </div>
        <div className="bottom-charts">
          <VehicleBrandPie />
        </div>
        <div className="bottom-charts">
          <VehicleCCPie />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
