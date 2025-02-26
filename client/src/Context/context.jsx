import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import Cookies from "js-cookie";

export const GlobalContext = createContext("Initial Value");

const data = {
  user: "Miku",
  token: Cookies.get("authToken") || undefined,
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);

  useEffect(() => {
    Cookies.set("authToken", state.token);
  }, [state.token]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}