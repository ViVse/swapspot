import axios from "axios";
import { getCookie } from "../utils/cookie";

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    "x-auth-token": getCookie("x-auth-token"),
  },
});
