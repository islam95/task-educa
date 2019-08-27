import * as Types from "./types";
import * as api from "../../helpers/api";

export const fetchData = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_RATES });
    try {
      const rates = await api.getRates();
      localStorage.setItem("rates", rates);
      dispatch({
        type: Types.FETCH_RATES_SUCCESS,
        rates
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
export const checkRates = () => {
  return async dispatch => {
    const rates = localStorage.getItem("rates");
    if (rates) {
      dispatch({
        type: Types.FETCH_RATES_SUCCESS,
        rates
      });
    }
  };
};
