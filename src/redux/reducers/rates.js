import * as Types from "../actions/types";

const INITIAL_STATE = {
  rates: {},
  response: {}
};

const Rates = (state = INITIAL_STATE, action) => {
  let rates = null;
  switch (action.type) {
    case Types.FETCH_RATES_SUCCESS:
      return { ...state, rates: action.rates, response: action.response };

    case Types.FETCH_RATES_ERROR:
      return { ...state, rates: {}, response: {}, error: action.error };

    case Types.ADD_RATE:
      rates = [...state.rates, action.rate];
      localStorage.setItem("rates", JSON.stringify(rates));
      return { ...state, rates };

    case Types.DELETE_RATE:
      const newState = [...state.rates];
      rates = newState.filter(rate => rate.key !== action.key);
      localStorage.setItem("rates", JSON.stringify(rates));
      return { ...state, rates };

    case Types.SELECT_CURRENCY:
      return { ...state, currency: action.currency }

    default:
      return state;
  }
};

export default Rates;
