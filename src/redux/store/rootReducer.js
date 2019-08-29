import { combineReducers } from "redux";
import rates from "../reducers/rates";
import currencies from "../reducers/currencies";

// Combine two reducers together
const rootReducer = combineReducers({
  rates,
  currencies
});

export default rootReducer;
