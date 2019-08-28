import * as Types from "./types";
import * as api from "../../helpers/api";

export const fetchData = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_RATES });
    try {
      const response = await api.getRates();
      const { rates } = response;
      dispatch({
        type: Types.FETCH_RATES_SUCCESS,
        rates,
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
        response: JSON.parse(rates)
      });
    }
  };
};
