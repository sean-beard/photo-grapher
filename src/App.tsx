import * as React from "react";
import styled from "styled-components";
import { isNil } from "ramda";

import { getPhotosWithLocation } from "./utils/files";
import {
  authorizeWithGoogle,
  fetchDrivePhotosWithLocFromFolder,
  fetchRootLevelDriveFolders
} from "./utils/api";
import Folders from "./components/Folders";
import Map from "./components/Map";
import { Photo, Folder } from "./types/api";
import LoginButton from "./components/LoginButton";
import Loader from "./components/Loading";
import { Colors } from "./styles/Base";

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: ${Colors.BASE_BLUE};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${Colors.WHITE};
`;

interface State {
  authorized: boolean | null;
  folders: Folder[];
  loadingFolders: boolean;
  loadingPhotos: boolean;
  photos: Photo[];
  selectedFolderId: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    authorized: null,
    folders: [],
    loadingFolders: false,
    loadingPhotos: false,
    photos: [],
    selectedFolderId: ""
  };

  componentDidMount() {
    this.authorize();
  }

  componentDidUpdate() {
    if (!this.state.authorized) {
      this.authorize();
    }
  }

  authorize = () =>
    authorizeWithGoogle(this.handleAuthSuccess, this.handleAuthError);

  handleAuthSuccess = () =>
    this.setState({ authorized: true }, this.getFolders);

  handleAuthError = () => {
    this.setState({ authorized: false });
    console.log("Error authorizing with Google...");
  };

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
  ) =>
    this.setState({
      loadingPhotos: false,
      photos: getPhotosWithLocation(response.result.files),
      selectedFolderId: folderId
    });

  handlePhotosFetchError = (error: any) =>
    this.setState({ loadingPhotos: false }, () =>
      console.log(`Error fetching photos: ${error.message}`)
    );

  render() {
    const {
      authorized,
      folders,
      loadingFolders,
      loadingPhotos,
      photos,
      selectedFolderId
    } = this.state;
    const photosExist = photos.length > 0;
    const showMap = selectedFolderId && photosExist && !loadingPhotos;
    return (
      <Wrapper>
        <Header>
          {!photosExist && (
            <h2>Whoops... Couldn't find any photos with location data.</h2>
          )}
          {isNil(authorized) && <Loader />}
          {authorized === false && (
            <LoginButton onLoginSuccess={this.getFolders} />
          )}
          <Folders {...{ folders }} onSelection={this.handleFolderSelection} />
          {(loadingFolders || loadingPhotos) && <Loader />}
          {showMap && <Map {...{ photos }} />}
        </Header>
      </Wrapper>
    );
  }
}

export default App;
