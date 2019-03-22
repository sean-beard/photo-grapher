import * as React from "react";
import styled from "styled-components";
import { isNil } from "ramda";

import { authorizeWithGoogle } from "./utils/api";
import Map from "./components/Map";
import { Photo } from "./types/api";
import LoginButton from "./components/LoginButton";
import Loader from "./components/Loading";
import { Colors } from "./styles/Base";
import Folders from "./components/Folders";

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
  photos: Photo[];
  showMap: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    authorized: null,
    photos: [],
    showMap: false
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

  handleAuthSuccess = () => this.setState({ authorized: true });

  handleAuthError = () => {
    this.setState({ authorized: false });
    console.log("Error authorizing with Google...");
  };

  handlePhotoFetchSuccess = (photos: Photo[]) =>
    this.setState({ photos, showMap: true });

  handlePhotoFetchFailure = () => this.setState({ photos: [], showMap: false });

  render() {
    const { authorized, photos, showMap } = this.state;
    return (
      <Wrapper>
        <Header>
          {isNil(authorized) && <Loader />}
          {authorized === false && (
            <LoginButton onLoginSuccess={this.handleAuthSuccess} />
          )}
          <Folders
            authorized={!!authorized}
            onPhotoFetchSuccess={this.handlePhotoFetchSuccess}
            onPhotoFetchFailure={this.handlePhotoFetchFailure}
          />
          {showMap && <Map {...{ photos }} />}
        </Header>
      </Wrapper>
    );
  }
}

export default App;
