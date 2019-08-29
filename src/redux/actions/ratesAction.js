import * as Types from "./types";
import * as api from "../../helpers/api";

// Fetch all latest and historical rates
export const fetchData = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_RATES });
    try {
      const response = await api.getRates(); // get all latest rates
      const oldRatesResponse = await api.getOldRates(); // get all old rates
      const { rates } = response;
      const oldRates = oldRatesResponse.rates;
      // return new rates in nice structured array
      const newRates = Object.keys(rates).map((code, key) => {
        return {
          key,
          code,
          rate: rates[code].toFixed(4),
          change: (rates[code] - oldRates[code]).toFixed(4)
        };
      });
      localStorage.setItem("rates", JSON.stringify(newRates)); // put to localStorage
      dispatch({
        type: Types.FETCH_RATES_SUCCESS,
        rates: newRates,
        response // for future reference if we need any data from it
      });
    } catch (error) {
      dispatch({
        type: Types.FETCH_RATES_ERROR,
        error
      });
    }
  };
};

// Check local storage
export const checkLocalStorage = () => {
  return async dispatch => {
    const rates = localStorage.getItem("rates");
    const currencies = localStorage.getItem("currencies");
    if (rates) {
      dispatch({
        type: Types.FETCH_RATES_SUCCESS,
        rates: JSON.parse(rates)
      });
    }
    if (currencies) {
      dispatch({
        type: Types.FETCH_CURRENCIES,
        currencies: JSON.parse(currencies)
      });
    }
  };
};

// Delete a rate with specified key
export const deleteRate = key => {
  return { type: Types.DELETE_RATE, key };
};

// Add rate object to rates array in redux store
export const addRate = rate => {
  return {
    type: Types.ADD_RATE,
    rate
  };
};
