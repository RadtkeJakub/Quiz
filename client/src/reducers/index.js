import { combineReducers } from "redux";
import quiz from "./quiz";
import user from "./user";

const reducers = combineReducers({
  quiz,
  user,
});

export default reducers;
