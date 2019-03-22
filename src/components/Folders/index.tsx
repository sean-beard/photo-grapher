import * as React from "react";

import { getPhotosWithLocation } from "../../utils/files";
import {
  fetchDrivePhotosWithLocFromFolder,
  fetchRootLevelDriveFolders
} from "../../utils/api";
import FolderList from "./FolderList";
import { Photo, Folder } from "../../types/api";
import Loader from "../Loading";

interface Props {
  authorized: boolean;
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

class Folders extends React.Component<Props, State> {
  state: State = {
    folders: [],
    loadingFolders: false,
    loadingPhotos: false,
    photos: [],
    selectedFolderId: ""
  };

  componentDidMount() {
    const { authorized } = this.props;
    if (authorized) {
      this.getFolders();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.authorized && this.props.authorized) {
      this.getFolders();
    }
  }

  getFolders = () =>
    this.setState({ loadingFolders: true }, () =>
      fetchRootLevelDriveFolders(
        this.handleFolderFetchSuccess,
        this.handleFolderFetchError
      )
    );

  handleFolderFetchSuccess = (
    response: gapi.client.HttpRequestFulfilled<any>
  ) => this.setState({ folders: response.result.files, loadingFolders: false });

  handleFolderFetchError = (error: any) =>
    this.setState({ loadingFolders: false }, () =>
      console.log(`Error fetching folders: ${error.message}`)
    );

  handleFolderSelection = (folderId: string) =>
    this.setState({ loadingPhotos: true }, () =>
      fetchDrivePhotosWithLocFromFolder(
        folderId,
        response => this.handlePhotosFetchSuccess(folderId, response),
        this.handlePhotosFetchError
      )
    );

  handlePhotosFetchSuccess = (
    folderId: string,
    response: gapi.client.HttpRequestFulfilled<any>
  ) => {
    const photos = getPhotosWithLocation(response.result.files);
    this.setState(
      {
        loadingPhotos: false,
        photos,
        selectedFolderId: folderId
      },
      () => {
        if (photos.length > 0) {
          this.props.onPhotoFetchSuccess(photos);
        } else {
          this.props.onPhotoFetchFailure();
        }
      }
    );
  };

  handlePhotosFetchError = (error: any) =>
    this.setState({ loadingPhotos: false }, () => {
      console.log(`Error fetching photos: ${error.message}`);
      this.props.onPhotoFetchFailure();
    });

  render() {
    if (!this.props.authorized) {
      return null;
    }

    const {
      folders,
      loadingFolders,
      loadingPhotos,
      photos,
      selectedFolderId
    } = this.state;
    const photosExist = photos.length > 0;

    return (
      <>
        {selectedFolderId && !photosExist && (
          <h2>Whoops... Couldn't find any photos with location data.</h2>
        )}
        <FolderList {...{ folders }} onSelection={this.handleFolderSelection} />
        {(loadingFolders || loadingPhotos) && <Loader />}
      </>
    );
  }
}

export default Folders;
