import axios from "axios";

const createAPI = (baseURL = "https://backend.kompek-febui.com/api/") => {
  const axiosInstance = axios.create({
    baseURL,
  });

  return axiosInstance;
};

const API = createAPI();

export function customAPI(url) {
  return createAPI(url);
}

export default API;
