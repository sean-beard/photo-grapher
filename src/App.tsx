import * as React from "react";
import styled from "styled-components";
import { isNil } from "ramda";

import { authorizeWithGoogle } from "utils/api";
import PhotoMap from "components/PhotoMap";
import { Photo } from "types/api";
import LoginButton from "components/LoginButton";
import { Colors } from "styles/Base";
import Folders from "components/Folders";
import PhotoData from "components/PhotoData";
import Navigation from "components/Navigation";

const Wrapper = styled.div`
  background-color: ${Colors.BASE_BLUE};
  min-height: 100vh;
  width: 100%;
  color: ${Colors.WHITE};
  font-size: calc(10px + 2vmin);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;

export interface AppState {
  authorized: boolean | null;
  photos: Photo[];
}

const App: React.FunctionComponent = () => {
  const [authorized, setAuthorized] = React.useState<AppState["authorized"]>(
    null
  );
  const [photos, setPhotos] = React.useState<AppState["photos"]>([]);

  React.useEffect(() => {
    if (isNil(authorized)) {
      authorize();
    }
  }, [authorized]);

  const authorize = () =>
    authorizeWithGoogle(handleAuthSuccess, handleAuthError);

  const handleAuthSuccess = () => setAuthorized(true);

  const handleAuthError = () => {
    console.log("Error authorizing with Google...");
    setAuthorized(false);
  };

  const handlePhotoFetchSuccess = (photos: Photo[]) => {
    setPhotos(photos);
  };

  const handlePhotoFetchFailure = () => {
    setPhotos([]);
  };

  return (
    <Wrapper>
      <Navigation {...{ authorized }} onLogout={() => setAuthorized(false)} />
      <Body>
        {authorized === false && (
          <LoginButton onLoginSuccess={handleAuthSuccess} />
        )}
        <Folders
          {...{ authorized }}
          onPhotoFetchSuccess={handlePhotoFetchSuccess}
          onPhotoFetchFailure={handlePhotoFetchFailure}
        />
        {authorized && (
          <>
            <PhotoMap {...{ photos }} />
            <PhotoData {...{ photos }} />
          </>
        )}
      </Body>
    </Wrapper>
  );
};

export default App;
