import * as Types from "./types";
import * as api from "../../helpers/api";

export const fetchData = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA });
    try {
      const rates = await api.getRates();
      dispatch({
        type: Types.FETCH_DATA_SUCCESS,
        rates
      });
    } catch (error) {
      dispatch({
        type: Types.FETCH_DATA_ERROR,
        error
      });
    }
  };
};