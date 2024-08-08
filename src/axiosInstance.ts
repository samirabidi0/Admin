import axios from "axios";
// const token = window.localStorage.getItem("authToken");
const headers: any = {};
// if (token) headers.authorization = `${token}`;
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers,
});

export default axiosInstance;
