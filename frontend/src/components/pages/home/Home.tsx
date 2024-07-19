import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeviceBrandPie from "./deviceBrandPie/DeviceBrandPie";
import SdkIntBar from "./sdkIntBar/SdkIntBar";
import VehicleBrandBar from "./vehicleBrandBar/VehicleBrandBar";
import VehicleBrandPie from "./vehicleBrandPie/VehicleBrandPie";
import VehicleCCPie from "./vehicleCCPie/VehicleCCPie";

import TopCard from "../../shared/topCard/TopCard";
import UserInfoGrid from "../../shared/userInfoGrid/UserInfoGrid";
import "./home.css";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../utils/api/api";
import { apiData } from "../../../@types/api/api.types";
import { roundToBeforeDecimal } from "../../../utils/commonFunctions/roundToBeforeDecimal";

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
          amount={roundToBeforeDecimal(apiData?.temperature?.avg as number)}
        />
        <TopCard
          bgColor={"#f47560"}
          title={"Humidity"}
          amount={roundToBeforeDecimal(apiData?.humidity?.avg as number)}
        />
        <TopCard
          bgColor={"#f47560"}
          title={"Other"}
          amount={roundToBeforeDecimal(apiData?.other?.avg as number)}
        />
      </div>
      <div className="middle-container">
        <div className="data-table">
          <div className="data-table-header">
            <h1 className="title">User Average Data</h1>
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
            <VehicleBrandBar />
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="bottom-charts">
          <SdkIntBar />
        </div>
        <div className="bottom-charts">
          <VehicleBrandPie />
        </div>
        <div className="bottom-charts">
          <VehicleCCPie />
        </div>
      </div>
    </div>
  );
};

export default Home;
