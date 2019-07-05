import * as React from "react";
import { AuthState } from "types/store";

const initialAuthState: AuthState = Object.freeze({
  authorized: null,
  setAuthState: () => {}
});

export const AuthContext = React.createContext(initialAuthState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setAuthState] = React.useReducer((state, newState) => {
    return { ...state, ...newState };
  }, initialAuthState);

  const contextValue: AuthState = React.useMemo(
    () => ({
      ...state,
      setAuthState
    }),
    [state.authorized]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
