export interface Authorized {
  authorized: boolean | null;
  setAuthorized: (authorized: boolean) => void;
}
