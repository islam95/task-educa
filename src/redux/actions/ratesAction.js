import * as Types from "./types";
import * as api from "../../helpers/api";

export const fetchData = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_RATES });
    try {
      const response = await api.getRates();
      const { rates } = response;
      const newRates = Object.keys(rates).map((code, key) => {
        return {
          key,
          code,
          rate: rates[code].toFixed(2)
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
    if (rates) {
      dispatch({
        type: Types.FETCH_RATES_SUCCESS,
        rates: JSON.parse(rates)
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

export const selectCurrency = currency => ({
  type: Types.SELECT_CURRENCY,
  currency
});
