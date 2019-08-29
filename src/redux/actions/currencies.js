import * as Types from "./types";
import * as api from "../../helpers/api";

// Action selects currency
export const selectCurrency = currency => ({
  type: Types.SELECT_CURRENCY,
  currency
});

// Get all currencies and store them in localStorage
export const getAllCurrencies = () => {
  return async dispatch => {
    try {
      const response = await api.getAllCurrencies();
      // make nice structured array of currencies
      const currencies = Object.keys(response).map((code, key) => {
        return { key, code, text: response[code] };
      });
      localStorage.setItem("currencies", JSON.stringify(currencies));
      dispatch({
        type: Types.FETCH_CURRENCIES,
        currencies
      });
    } catch (error) {
      dispatch({
        type: Types.FETCH_CURRENCIES_ERROR,
        error
      });
    }
  };
};
