import { combineReducers } from "redux";
import questions from "./questions";
import user from "./user";

const reducers = combineReducers({
  questions,
  user,
});

export default reducers;
