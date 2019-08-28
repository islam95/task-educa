import * as Types from "../actions/types";

const INITIAL_STATE = {
  rates: {},
  response: {}
};

const Rates = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_RATES_SUCCESS:
      return { ...state, rates: action.rates, response: action.response };

    case Types.FETCH_RATES_ERROR:
      return { ...state, rates: {}, response: {}, error: action.error };

    default:
      return state;
  }
};

export default Rates;
