import { Photo } from "./api";

// Omit is introduced in TS 3.5
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface AuthState {
  authorized: boolean | null;
  setAuthState: React.Dispatch<Partial<Omit<AuthState, "setAuthState">>>;
}

export interface PhotoState {
  folderId: string;
  photos: Photo[];
  setPhotoState: React.Dispatch<Partial<Omit<PhotoState, "setPhotoState">>>;
}
