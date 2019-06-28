import * as React from "react";

import { Authorized } from "types/store";

const initialAuthState: Authorized = Object.freeze({
  authorized: null,
  setAuthorized: () => {}
});

export const AuthContext = React.createContext<Authorized>(initialAuthState);

export const AuthProvider: React.FC = ({ children }) => {
  const setAuthorized = (newAuthorizedVal: boolean) => {
    setAuthorizedVal((prevState: Authorized) => ({
      ...prevState,
      authorized: newAuthorizedVal
    }));
  };

  const initProviderState: Authorized = {
    authorized: null,
    setAuthorized
  };

  const [authorized, setAuthorizedVal] = React.useState(initProviderState);

  return (
    <AuthContext.Provider value={authorized}>{children}</AuthContext.Provider>
  );
};
