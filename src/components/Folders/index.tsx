import * as React from "react";
import { isNil } from "ramda";

import { getPhotosWithLocation } from "utils/photos";
import {
  fetchDrivePhotosWithLocFromFolder,
  fetchRootLevelDriveFolders
} from "utils/api";
import FolderList from "./FolderList";
import { Folder } from "types/api";
import { ModalLoader } from "components/Loading";
import { AuthContext, PhotoContext } from "store";

interface State {
  loading: boolean;
  folders: Folder[];
  selectedFolderId: string;
}

type Action =
  | {
      type:
        | "FETCH_FOLDERS"
        | "FETCH_FOLDERS_FAILURE"
        | "FETCH_PHOTOS"
        | "FETCH_PHOTO_FAILURE";
    }
  | {
      type: "FETCH_FOLDERS_SUCCESS";
      folders: Folder[];
    }
  | {
      type: "FETCH_PHOTO_SUCCESS";
      selectedFolderId: string;
    };

const initialState: State = Object.freeze({
  loading: true,
  folders: [],
  selectedFolderId: ""
});

const folderReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_FOLDERS":
      return { ...initialState, loading: true };
    case "FETCH_FOLDERS_SUCCESS":
      return {
        loading: false,
        folders: action.folders,
        selectedFolderId: ""
      };
    case "FETCH_FOLDERS_FAILURE":
      return initialState;
    case "FETCH_PHOTOS":
      return { ...state, loading: true };
    case "FETCH_PHOTO_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedFolderId: action.selectedFolderId
      };
    case "FETCH_PHOTO_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const Folders: React.FC = () => {
  const { authorized } = React.useContext(AuthContext);
  const { photos, setPhotoState } = React.useContext(PhotoContext);

  const [{ loading, folders, selectedFolderId }, dispatch] = React.useReducer(
    folderReducer,
    initialState
  );

  React.useEffect(() => {
    if (authorized) {
      getFolders();
    }
  }, [authorized]);

  if (authorized === false) {
    return null;
  }

  const getFolders = () => {
    dispatch({ type: "FETCH_FOLDERS" });
    fetchRootLevelDriveFolders(
      handleFolderFetchSuccess,
      handleFolderFetchError
    );
  };

  const handleFolderFetchSuccess = (
    response: gapi.client.HttpRequestFulfilled<any>
  ) => {
    dispatch({ type: "FETCH_FOLDERS_SUCCESS", folders: response.result.files });
  };

  const handleFolderFetchError = (error: any) => {
    console.log(`Error fetching folders: ${error.message}`);
    dispatch({ type: "FETCH_FOLDERS_FAILURE" });
  };

  const handleFolderSelection = (folderId: string) => {
    dispatch({ type: "FETCH_PHOTOS" });
    fetchDrivePhotosWithLocFromFolder(
      folderId,
      response => handlePhotosFetchSuccess(folderId, response),
      handlePhotosFetchError
    );
  };

  const handlePhotosFetchSuccess = (
    folderId: string,
    response: gapi.client.HttpRequestFulfilled<any>
  ) => {
    const photos = getPhotosWithLocation(response.result.files);
    setPhotoState({ photos });
    dispatch({ type: "FETCH_PHOTO_SUCCESS", selectedFolderId: folderId });
  };

  const handlePhotosFetchError = (error: any) => {
    console.log(`Error fetching photos: ${error.message}`);
    dispatch({ type: "FETCH_PHOTO_FAILURE" });
    setPhotoState({ photos: [] });
  };

  return (
    <>
      {selectedFolderId && photos.length < 1 && (
        <h2>Whoops... Couldn't find any photos with location data.</h2>
      )}
      <FolderList {...{ folders }} onSelection={handleFolderSelection} />
      <ModalLoader isLoading={isNil(authorized) || loading} />
    </>
  );
};

export default Folders;
