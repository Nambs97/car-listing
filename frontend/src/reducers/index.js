import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import carReducer from "./car.reducer";
import currentCarReducer from "./currentcar.reducer";
import commentReducer from "./comment.reducer";
import commentorReducer from "./commentor.reducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  cars: carReducer,
  currentCar: currentCarReducer,
  comments: commentReducer,
  commentors: commentorReducer
});