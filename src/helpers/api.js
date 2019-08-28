import axios from "axios";
import { baseUrl1, baseUrl2, appId } from "./constants";

// Create an instance for axios with headers for authorization
const instance = axios.create({
  baseUrl1,
  headers: {
    Authorization: `Token ${appId}`
  }
});

// Get all Currency names
export const getAllCurrencies = async () => {
  const { data } = await instance.get(`${baseUrl1}/currencies.json`);
  localStorage.setItem("currencies", JSON.stringify(data));
  return data;
};

// Get all latest rates
export const getRates = async () => {
  const { data } = await axios.get(`${baseUrl2}/latest?base=USD`);
  return data;
};
