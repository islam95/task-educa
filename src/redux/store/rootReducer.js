import { combineReducers } from "redux";
import rates from "../reducers/rates";
import currencies from "../reducers/currencies";

const rootReducer = combineReducers({
  rates,
  currencies
});

export default rootReducer;
