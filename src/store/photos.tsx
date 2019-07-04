import * as React from "react";

import { PhotoState } from "types/store";

const initialPhotoState: PhotoState = Object.freeze({
  folderId: "",
  photos: [],
  setPhotoState: () => {}
});

export const PhotoContext = React.createContext(initialPhotoState);

export const PhotoProvider: React.FC = ({ children }) => {
  const [state, setPhotoState] = React.useReducer((state, newState) => {
    return { ...state, ...newState };
  }, initialPhotoState);

  const contextValue: PhotoState = React.useMemo(
    () => ({
      ...state,
      setPhotoState
    }),
    [state.photos]
  );

  return (
    <PhotoContext.Provider value={contextValue}>
      {children}
    </PhotoContext.Provider>
  );
};
