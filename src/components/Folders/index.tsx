import * as React from "react";
import { isNil, isEmpty } from "ramda";
import { RouteComponentProps, withRouter } from "react-router";

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
    };

const initialState: State = Object.freeze({
  loading: false,
  folders: []
});

const folderReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_FOLDERS":
      return { ...initialState, loading: true };
    case "FETCH_FOLDERS_SUCCESS":
      return {
        loading: false,
        folders: action.folders
      };
    case "FETCH_FOLDERS_FAILURE":
      return initialState;
    case "FETCH_PHOTOS":
      return { ...state, loading: true };
    case "FETCH_PHOTO_SUCCESS":
      return {
        ...state,
        loading: false
      };
    case "FETCH_PHOTO_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const Folders: React.FC<RouteComponentProps> = ({ history }) => {
  const { authorized } = React.useContext(AuthContext);
  const {
    folders: storeFolders,
    folderId,
    photos,
    setPhotoState
  } = React.useContext(PhotoContext);

  const [{ loading, folders }, dispatch] = React.useReducer(
    folderReducer,
    initialState
  );

  React.useEffect(() => {
    if (!authorized) {
      return;
    }

    if (isEmpty(storeFolders)) {
      getFolders();
    } else {
      dispatch({ type: "FETCH_FOLDERS_SUCCESS", folders: storeFolders });
    }
  }, [authorized, storeFolders]);

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
    const folders = response.result.files;
    setPhotoState({ folders });
    dispatch({ type: "FETCH_FOLDERS_SUCCESS", folders });
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
    setPhotoState({ photos, folderId });
    dispatch({ type: "FETCH_PHOTO_SUCCESS" });
    if (folderId && photos.length > 0) {
      history.push("/map");
    }
  };

  const handlePhotosFetchError = (error: any) => {
    console.log(`Error fetching photos: ${error.message}`);
    dispatch({ type: "FETCH_PHOTO_FAILURE" });
    setPhotoState({ photos: [] });
  };

  return (
    <>
      {folderId && photos.length < 1 && (
        <h2>Whoops... Couldn't find any photos with location data.</h2>
      )}
      <FolderList {...{ folders }} onSelection={handleFolderSelection} />
      <ModalLoader isLoading={isNil(authorized) || loading} />
    </>
  );
};

export default withRouter(Folders);
