import * as Types from "./types";
import * as api from "../../helpers/api";

export const fetchData = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_RATES });
    try {
      const response = await api.getRates();
      const oldRatesResponse = await api.getOldRates();
      const { rates } = response;
      const oldRates = oldRatesResponse.rates;
      const newRates = Object.keys(rates).map((code, key) => {
        return {
          key,
          code,
          rate: rates[code].toFixed(4),
          change: (rates[code] - oldRates[code]).toFixed(4)
        };
      });
      localStorage.setItem("rates", JSON.stringify(newRates));
      dispatch({
        type: Types.FETCH_RATES_SUCCESS,
        rates: newRates,
        response
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

export const deleteRate = key => {
  return { type: Types.DELETE_RATE, key };
};

export const addRate = rate => {
  return {
    type: Types.ADD_RATE,
    rate
  };
};
