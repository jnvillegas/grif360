import React, { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { authTypes } from "./types";

const initialState = {
  isLogged: false,
  userId: null,
  username: null,
  token: null,
  refreshToken: null,
};

const init = () => {
  const data = localStorage.getItem("authState");
  const dataJson = JSON.parse(data);

  if (data) {
    const info = {
      isLogged: true,
      userId: dataJson.griftin_userId,
      username: dataJson.griftin_username,
      token: dataJson.griftin_token,
      refreshToken: dataJson.griftin_refresh_token,
    };

    return info;
  } else {
    return initialState;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);
  const base_url = process.env.REACT_APP_BASE_URL;

  const login = (data) => {
    dispatch({
      type: authTypes.login,
      payload: data,
    });
  };

  const logout = () => {
    dispatch({
      type: authTypes.logout,
    });

    localStorage.removeItem("authState");
  };

  const refreshAuthToken = async () => {    
    const refreshToken = authState.refreshToken;

    const body = {
      userId: authState.userId,
      refreshToken: refreshToken,
    };

    try {
      const res = await fetch(`${base_url}/auth/refresh-token`, {
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (!res.ok) throw new Error("Error al refrescar token");
      const data = await res.json();
      //actualizacion del estado
      dispatch({
        type: authTypes.refresh,
        payload: {
          token: data.access,
          refreshToken: data.refresh,
        },
      });

      console.log("EJECUTANDO REFRESH DEL TOKEN!!!!!!!!!!!!!!!!!!!!!!");

      //actualizacion del localStorage
      localStorage.setItem(
        "authState",
        JSON.stringify({
          griftin_token: data.access,
          griftin_refresh_token: data.refresh,
          griftin_userId: authState.userId,
          griftin_username: authState.username,
        })
      );
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  /**
   * Checks if a token has expired. *
   * @param {string} token - The token to check.
   * @return {boolean} Returns true if the token has expired, false otherwise.
   */
  const checktokenExpiration = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("ES VALIDO EL TOKEN?", !(decodedToken.exp * 1000 < Date.now()));
    return decodedToken.exp * 1000 < Date.now();
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("authState");
    if (storedAuth) {
      const dataJson = JSON.parse(storedAuth);
      if (checktokenExpiration(dataJson.griftin_token)) {
        refreshAuthToken();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
