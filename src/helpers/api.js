import axios from "axios";
import { baseUrl, appId } from "./constants";

// Create an instance for axios with headers for authorization
const instance = axios.create({
  baseUrl,
  headers: {
    Authorization: `Token ${appId}`
  }
});

// Get all Currency names
export const getAllCurrencies = async () => {
  const { data } = await instance.get(`${baseUrl}/currencies.json`);
  return data;
};

// Get all latest rates
export const getRates = async () => {
  const { data } = await instance.get(`${baseUrl}/latest.json`);
  return data;
};

// Get rate data for specific currency
export const selectRate = async currency => {
  const { data } = await instance.get(
    `${baseUrl}/latest.json?symbols=${currency}`
  );
  return data;
};

// Get all historical rates
export const getOldRates = async () => {
  const { data } = await instance.get(`${baseUrl}/historical/2019-08-20.json`);
  return data;
};
