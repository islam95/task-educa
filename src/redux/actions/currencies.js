import * as Types from "./types";
import * as api from "../../helpers/api";

export const selectCurrency = currency => ({
  type: Types.SELECT_CURRENCY,
  currency
});

export const getAllCurrencies = () => {
  return async dispatch => {
    try {
      const response = await api.getAllCurrencies();
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
