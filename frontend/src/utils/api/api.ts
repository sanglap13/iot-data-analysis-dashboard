import axios, { AxiosResponse } from "axios";
import { data, apiResponse } from "../../@types/api/api.types";

const API_URL = "http://127.0.0.1:8000/api/iot/analytics/";

export const api = async (): Promise<apiResponse | undefined> => {
  try {
    const response: AxiosResponse<apiResponse> = await axios.get(API_URL);
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
