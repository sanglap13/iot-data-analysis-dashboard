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

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="cards-container">
        <div className="text-message">Welcome!!</div>
        <TopCard bgColor={"#f1e15b"} title={"Total Users"} amount={"527"} />
        <TopCard bgColor={"#f47560"} title={"Growth"} amount={"10%"} />
      </div>
      <div className="middle-container">
        <div className="data-table">
          <div className="data-table-header">
            <h1 className="title">User Data</h1>
            <IconButton onClick={() => navigate("/users")}>
              <OpenInNewIcon />
            </IconButton>
          </div>
          <UserInfoGrid />
        </div>
        <div className="charts">
          <div className="pie-chart">
            <DeviceBrandPie />
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
