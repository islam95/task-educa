import * as Types from "../actions/types";

const INITIAL_STATE = {
  rates: []
};

const Rates = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_DATA_SUCCESS:
      return { ...state, rates: action.rates };

    case Types.FETCH_DATA_ERROR:
      return { ...state, rates: [], error: action.error };

    default:
      return state;
  }
};

export default Rates;
