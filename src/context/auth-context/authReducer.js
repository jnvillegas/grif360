

import { authTypes as types} from "./types"; 



export const authReducer = (state = {}, action) => {

  switch (action.type) {    
    case types.login:      
      return {
        ...state,
        isLogged: true,
        userId: action.payload.userId,
        username: action.payload.username,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      }

    case types.logout:
      return {
        ...state,
        isLogged: false,
        userId: null,
        username: null,
        token: null,
        refreshToken: null
      }

    case types.refresh:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      } 

      default:
        return state;
  }
};
