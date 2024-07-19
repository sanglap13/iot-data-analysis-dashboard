import axios, { AxiosResponse } from "axios";
import { apiResponse, apiData } from "../../@types/api/api.types";

const REST_API_URL = "http://127.0.0.1:8000/api/iot/analytics/";

export const api = async (): Promise<undefined | apiData> => {
  try {
    const response: AxiosResponse<apiResponse> = await axios.get(REST_API_URL);
    if (response.status) {
      const { data } = response.data;
      return data;
    } else {
      console.error("No data found", response);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
