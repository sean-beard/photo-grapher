import * as React from "react";
import { isNil, isEmpty } from "ramda";
import { RouteComponentProps, withRouter } from "react-router";

import { getPhotosWithLocation } from "utils/photos";
import {
  fetchDrivePhotosWithLocFromFolder,
  fetchRootLevelDriveFolders
} from "utils/api";
import FolderList from "./FolderList";
import { ModalLoader } from "components/Loading";
import { AuthContext, PhotoContext } from "store";

const Folders: React.FC<RouteComponentProps> = ({ history }) => {
  const { authorized } = React.useContext(AuthContext);
  const { folders, folderId, photos, setPhotoState } = React.useContext(
    PhotoContext
  );

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!authorized) {
      return;
    }

    if (isEmpty(folders)) {
      getFolders();
    }
  }, [authorized, folders]);

  if (authorized === false) {
    return null;
  }

  const getFolders = () => {
    setLoading(true);
    fetchRootLevelDriveFolders(
      handleFolderFetchSuccess,
      handleFolderFetchError
    );
  };

  const handleFolderFetchSuccess = (
    response: gapi.client.HttpRequestFulfilled<any>
  ) => {
    setPhotoState({ folders: response.result.files });
    setLoading(false);
  };

  const handleFolderFetchError = (error: any) => {
    console.log(`Error fetching folders: ${error.message}`);
    setLoading(false);
  };

  const handleFolderSelection = (folderId: string) => {
    setLoading(true);
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
    setLoading(false);
    if (folderId && photos.length > 0) {
      history.push("/map");
    }
  };

  const handlePhotosFetchError = (error: any) => {
    console.log(`Error fetching photos: ${error.message}`);
    setLoading(false);
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
