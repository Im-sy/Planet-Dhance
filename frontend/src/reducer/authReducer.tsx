import { IAuthState, AuthActionType, SET_CURRENT_USER, DELETE_CURRENT_USER } from "./authTypes";

const initialState: IAuthState = {
  isAuthenticated: false,
  user: {
    userId: 0,
    nickname: '',
    nationName: '',
    roles: []
  }
}

const authReducer = (
  state = initialState,
  action: AuthActionType
): IAuthState => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: action.user
      }
    case DELETE_CURRENT_USER:
      return {
        isAuthenticated: false,
        user: {
          userId: 0,
          nickname: '',
          nationName: '',
          roles: []
        }
      }
    default: 
      return state;
  }
}

export default authReducer;