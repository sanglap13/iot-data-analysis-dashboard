import { useCallback, useEffect, useState } from "react";

import { GridColDef } from "@mui/x-data-grid";
import {
  FlattenedUserDataGridInfo,
  UserDataGridInfo,
} from "../../../@types/dataGrid.types";
import { DATAGRID_COLUMNS } from "../../../constants/userDataGrid";
import { api } from "../../../utils/api/api";
import { formatTimestamp } from "../../../utils/commonFunctions/formatTimestamp";
import UserDataGrid from "../userDataGrid/UserDataGrid";
import { useWebSocket } from "../../../utils/hooks/useWebSocket";

//header of DataGrid
const dataGridColumns: GridColDef[] = DATAGRID_COLUMNS;

const UserInfoGrid = () => {
  //for ApiCall as well as this is the rows of dataGrid
  const [dataGriduserInfo, setDataGridUserInfo] = useState<
    FlattenedUserDataGridInfo[]
  >([]);
  const { deviceData } = useWebSocket();

  const flattenData = (
    data: UserDataGridInfo[]
  ): FlattenedUserDataGridInfo[] => {
    return data.map((item) => ({
      device_id: item.device_id,
      humidity: Number(item.sensor_value.humidity.toFixed(2)),
      temperature: Number(item.sensor_value.temperature.toFixed(2)),
      other: Number(item.sensor_value.other.toFixed(2)),
      timestamp: formatTimestamp(item.timestamp),
    }));
  };

  const getApiData = useCallback(async () => {
    const userData = await api();

    if (userData) {
      const flattenedData = flattenData(userData.device_data);
      setDataGridUserInfo(flattenedData);
    } else {
      console.error("userData is undefined or does not contain data");
    }
  }, []);

  useEffect(() => {
    getApiData();
  }, [getApiData]);

  useEffect(() => {
    if (deviceData.length > 0) {
      const newDeviceData = deviceData.map((message) => ({
        device_id: message.device_id,
        humidity: message.sensor_value.humidity,
        temperature: message.sensor_value.temperature,
        other: message.sensor_value.other,
        timestamp: formatTimestamp(message.timestamp),
      }));

      const updatedData = [
        ...dataGriduserInfo,
        ...newDeviceData.filter(
          (item) =>
            !dataGriduserInfo.some(
              (existing) =>
                existing.device_id === item.device_id &&
                existing.timestamp === item.timestamp
            )
        ),
      ];

      setDataGridUserInfo(updatedData);
    }
  }, [deviceData]);

  return (
    <div>
      <UserDataGrid
        dataGridColumns={dataGridColumns}
        dataGriduserInfo={dataGriduserInfo}
      />
    </div>
  );
};

export default UserInfoGrid;
