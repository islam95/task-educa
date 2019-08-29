import * as Types from "../actions/types";

const INITIAL_STATE = {
  currencies: {}
};

const Currencies = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_CURRENCIES:
      return { ...state, currencies: action.currencies };

    case Types.FETCH_CURRENCIES_ERROR:
      return { ...state, currencies: {}, error: action.error };

    default:
      return state;
  }
};

export default Currencies;
