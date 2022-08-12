import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { IAuthState } from "./authTypes";

export interface rootState{
  authReducer: IAuthState;
}

const rootReducer = combineReducers({
  authReducer
});

export default rootReducer;