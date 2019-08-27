import axios from "axios";
import { baseUrl, appId } from "./constants";

// Create an instance for axios with headers for authorization
const instance = axios.create({
  baseUrl,
  headers: {
    Authorization: `Token ${appId}`
  }
});

// Get all latest rates
export const getRates = async () => {
  const { data } = await instance.get(`${baseUrl}/latest.json`);
  return data;
};
