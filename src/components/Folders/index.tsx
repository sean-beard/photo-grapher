import * as React from "react";
import { isNil } from "ramda";

import { getPhotosWithLocation } from "utils/photos";
import {
  fetchDrivePhotosWithLocFromFolder,
  fetchRootLevelDriveFolders
} from "utils/api";
import FolderList from "./FolderList";
import { Photo, Folder } from "../../types/api";
import { ModalLoader } from "components/Loading";
import { AuthContext } from "store";

interface Props {
  onPhotoFetchSuccess: (photos: Photo[]) => void;
  onPhotoFetchFailure: () => void;
}

const Folders: React.FunctionComponent<Props> = ({
  onPhotoFetchSuccess,
  onPhotoFetchFailure
}) => {
  const { authorized } = React.useContext(AuthContext);

  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [loadingFolders, setLoadingFolders] = React.useState(false);
  const [loadingPhotos, setLoadingPhotos] = React.useState(false);
  const [photos, setPhotos] = React.useState<Photo[]>([]);
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
    setPhotos(photos);
    setSelectedFolderId(folderId);
    if (photos.length > 0) {
      onPhotoFetchSuccess(photos);
    } else {
      onPhotoFetchFailure();
    }
  };

  const handlePhotosFetchError = (error: any) => {
    console.log(`Error fetching photos: ${error.message}`);
    setLoadingPhotos(false);
    onPhotoFetchFailure();
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
