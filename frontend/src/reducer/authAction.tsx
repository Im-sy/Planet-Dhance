import { userProps } from "../components/API/AuthService";
import { AuthActionType, SET_CURRENT_USER, DELETE_CURRENT_USER } from "./authTypes";

export const setCurrentUserAction = (
  user: userProps,
): AuthActionType => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export const deleteCurrentUserAction = (): AuthActionType => {
  return {
    type: DELETE_CURRENT_USER
  }
}