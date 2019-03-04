import * as React from "react";
import styled from "styled-components";

import { getPhotosWithLocation } from "./utils/files";
import {
  authorizeWithGoogle,
  fetchDrivePhotosWithLocFromFolder,
  fetchRootLevelDriveFolders
} from "./utils/api";
import Folders from "./components/Folders";
import GenericMap from "./components/GenericMap";
import { Photo, Folder } from "./types/api";
import LoginButton from "./components/LoginButton";

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

interface State {
  authorized: boolean;
  folders: Folder[];
  photos: Photo[];
  selectedFolderId: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    authorized: false,
    folders: [],
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
    fetchRootLevelDriveFolders(
      this.handleFolderFetchSuccess,
      this.handleFolderFetchError
    );

  handleFolderFetchSuccess = (
    response: gapi.client.HttpRequestFulfilled<any>
  ) => this.setState({ folders: response.result.files });

  handleFolderFetchError = (error: any) =>
    console.log(`Error fetching folders: ${error.message}`);

  handleFolderSelection = (folderId: string) =>
    fetchDrivePhotosWithLocFromFolder(
      folderId,
      response =>
        this.setState({
          photos: getPhotosWithLocation(response.result.files),
          selectedFolderId: folderId
        }),
      error => console.log(`Error fetching photos: ${error.message}`)
    );

  render() {
    const { authorized, folders, photos, selectedFolderId } = this.state;
    const showMap = selectedFolderId && photos.length > 0;
    return (
      <Wrapper>
        <Header>
          {!authorized && <LoginButton onLoginSuccess={this.getFolders} />}
          <Folders {...{ folders }} onSelection={this.handleFolderSelection} />
          {showMap && <GenericMap {...{ photos }} />}
        </Header>
      </Wrapper>
    );
  }
}

export default App;
