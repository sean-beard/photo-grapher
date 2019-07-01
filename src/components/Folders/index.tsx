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

const Folders: React.FC = () => {
  const { authorized } = React.useContext(AuthContext);
  const { photos, setPhotoState } = React.useContext(PhotoContext);

  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [loadingFolders, setLoadingFolders] = React.useState(false);
  const [loadingPhotos, setLoadingPhotos] = React.useState(false);
  const [selectedFolderId, setSelectedFolderId] = React.useState("");

  React.useEffect(() => {
    if (authorized) {
      getFolders();
    }
  }, [authorized]);

  if (authorized === false) {
    return null;
  }

  const getFolders = () => {
    setLoadingFolders(true);
    fetchRootLevelDriveFolders(
      handleFolderFetchSuccess,
      handleFolderFetchError
    );
  };

  const handleFolderFetchSuccess = (
    response: gapi.client.HttpRequestFulfilled<any>
  ) => {
    setLoadingFolders(false);
    setFolders(response.result.files);
  };

  const handleFolderFetchError = (error: any) => {
    console.log(`Error fetching folders: ${error.message}`);
    setLoadingFolders(false);
  };

  const handleFolderSelection = (folderId: string) => {
    setLoadingPhotos(true);
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
    setLoadingPhotos(false);
    setSelectedFolderId(folderId);
    setPhotoState({ photos });
  };

  const handlePhotosFetchError = (error: any) => {
    console.log(`Error fetching photos: ${error.message}`);
    setLoadingPhotos(false);
    setPhotoState({ photos: [] });
  };

  return (
    <>
      {selectedFolderId && photos.length < 1 && (
        <h2>Whoops... Couldn't find any photos with location data.</h2>
      )}
      <FolderList {...{ folders }} onSelection={handleFolderSelection} />
      <ModalLoader
        isLoading={isNil(authorized) || loadingFolders || loadingPhotos}
      />
    </>
  );
};

export default Folders;
