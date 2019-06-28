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

interface State {
  folders: Folder[];
  loadingFolders: boolean;
  loadingPhotos: boolean;
  photos: Photo[];
  selectedFolderId: string;
}

const Folders: React.FunctionComponent<Props> = ({
  onPhotoFetchSuccess,
  onPhotoFetchFailure
}) => {
  const { authorized } = React.useContext(AuthContext);
  if (authorized === false) {
    return null;
  }

  const [folders, setFolders] = React.useState<State["folders"]>([]);
  const [loadingFolders, setLoadingFolders] = React.useState<
    State["loadingFolders"]
  >(false);
  const [loadingPhotos, setLoadingPhotos] = React.useState<
    State["loadingPhotos"]
  >(false);
  const [photos, setPhotos] = React.useState<State["photos"]>([]);
  const [selectedFolderId, setSelectedFolderId] = React.useState<
    State["selectedFolderId"]
  >("");

  React.useEffect(() => {
    if (authorized) {
      getFolders();
    }
  }, [authorized]);

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
