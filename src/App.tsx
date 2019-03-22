import * as React from "react";
import styled from "styled-components";
import { isNil } from "ramda";

import { authorizeWithGoogle } from "utils/api";
import Map from "components/Map";
import { Photo } from "types/api";
import LoginButton from "components/LoginButton";
import Loader from "components/Loading";
import { Colors } from "styles/Base";
import Folders from "components/Folders";

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

const App: React.FunctionComponent = () => {
  const [authorized, setAuthorized] = React.useState<State["authorized"]>(null);
  const [photos, setPhotos] = React.useState<State["photos"]>([]);
  const [showMap, setShowMap] = React.useState<State["showMap"]>(false);

  React.useEffect(() => authorize(), [authorized]);

  const authorize = () =>
    authorizeWithGoogle(handleAuthSuccess, handleAuthError);

  const handleAuthSuccess = () => setAuthorized(true);

  const handleAuthError = () => {
    console.log("Error authorizing with Google...");
    setAuthorized(false);
  };

  const handlePhotoFetchSuccess = (photos: Photo[]) => {
    setPhotos(photos);
    setShowMap(true);
  };

  const handlePhotoFetchFailure = () => {
    setPhotos([]);
    setShowMap(false);
  };

  return (
    <Wrapper>
      <Header>
        {isNil(authorized) && <Loader />}
        {authorized === false && (
          <LoginButton onLoginSuccess={handleAuthSuccess} />
        )}
        <Folders
          authorized={!!authorized}
          onPhotoFetchSuccess={handlePhotoFetchSuccess}
          onPhotoFetchFailure={handlePhotoFetchFailure}
        />
        {showMap && <Map {...{ photos }} />}
      </Header>
    </Wrapper>
  );
};

export default App;
