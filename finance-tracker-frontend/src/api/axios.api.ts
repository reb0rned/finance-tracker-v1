import axios from "axios";
import { getTokenFromStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    Authorization: `Bearer` + getTokenFromStorage()
  }
})