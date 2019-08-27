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
  try {
    const { data } = await instance.get(`latest.json`);
    console.log("Data", data);
    return data;
  } catch (error) {
    console.error("Error occured in api call", error);
  }
};
