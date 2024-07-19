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

const UserInfoGrid = () => {
  //for ApiCall as well as this is the rows of dataGrid
  const [dataGriduserInfo, setDataGridUserInfo] = useState<
    FlattenedUserDataGridInfo[]
  >([]);

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

  //header of DataGrid
  const dataGridColumns: GridColDef[] = DATAGRID_COLUMNS;

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
