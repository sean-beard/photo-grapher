import { Photo } from "./api";

export interface AuthState {
  authorized: boolean | null;
  setAuthState: React.Dispatch<any>;
}

export interface PhotoState {
  folderId: string;
  photos: Photo[];
  setPhotoState: React.Dispatch<any>;
}
