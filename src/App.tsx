import * as React from "react";
import styled from "styled-components";
import { isNil } from "ramda";
import { VictoryChart, VictoryTheme, VictoryBar } from "victory";

import { authorizeWithGoogle } from "utils/api";
import Map from "components/Map";
import { Photo } from "types/api";
import LoginButton from "components/LoginButton";
import Loader from "components/Loading";
import { Colors, Spacing } from "styles/Base";
import Folders from "components/Folders";
import { avgCountPerWeekDay } from "utils/photos";
import { getAbbreviatedDay } from "utils/time";
import { hasItems } from "utils/data-operations";

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

const Listing = styled.div`
  display: flex;

  > * {
    margin: ${Spacing.MICRO} 0 ${Spacing.MICRO} ${Spacing.MEDIUM};
  }

  h4 + h4 {
    margin-left: ${Spacing.MICRO};
  }
`;

const AverageCountWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > * {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

interface State {
  authorized: boolean | null;
  photos: Photo[];
}

const App: React.FunctionComponent = () => {
  const [authorized, setAuthorized] = React.useState<State["authorized"]>(null);
  const [photos, setPhotos] = React.useState<State["photos"]>([]);

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
  };

  const handlePhotoFetchFailure = () => {
    setPhotos([]);
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
        <Map {...{ photos }} />
        {hasItems(photos) && (
          <>
            <h2>Total photos: {photos.length}</h2>
            <h3>Average Photo Count Per Week Day</h3>
            <AverageCountWrapper>
              <div>
                <ListingWrapper>
                  {avgCountPerWeekDay(photos).map(([day, count], index) => (
                    <Listing key={index}>
                      <h4>{`${day}:`}</h4>
                      <h4>{Math.round(count * 100) / 100}</h4>
                    </Listing>
                  ))}
                </ListingWrapper>
              </div>
              <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
                <VictoryBar
                  style={{ data: { fill: Colors.ACTION_BLUE } }}
                  data={avgCountPerWeekDay(photos).map(([day, count]) => ({
                    x: getAbbreviatedDay(day),
                    y: Math.round(count * 100) / 100
                  }))}
                />
              </VictoryChart>
            </AverageCountWrapper>
          </>
        )}
      </Header>
    </Wrapper>
  );
};

export default App;
