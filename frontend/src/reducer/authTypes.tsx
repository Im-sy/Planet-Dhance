import { userProps } from "../components/API/AuthService";
export const SET_CURRENT_USER="SET_CURRENT_USER";
export const DELETE_CURRENT_USER="DELETE_CURRENT_USER";

export interface IAuthState {
  isAuthenticated: boolean;
  user: userProps;
}


export interface setCurrentUser {
  type: typeof SET_CURRENT_USER;
  user: userProps;
}

export interface deleteCurrentUser {
  type: typeof DELETE_CURRENT_USER;
}

export type AuthActionType = setCurrentUser | deleteCurrentUser;
