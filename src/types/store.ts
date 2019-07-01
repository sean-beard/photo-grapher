export interface AuthState {
  authorized: boolean | null;
  setAuthState: React.Dispatch<any>;
}
