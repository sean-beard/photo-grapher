import * as React from "react";
import styled from "styled-components";
import { isNil } from "ramda";
import { Switch, Route } from "react-router-dom";

import { authorizeWithGoogle } from "utils/api";
import LoginButton from "components/LoginButton";
import { Colors } from "styles/Base";
import Navigation from "components/Navigation";
import Home from "components/Home";
import { AuthContext, PhotoProvider } from "store";
import PhotoMap from "components/PhotoMap";
import PhotoData from "components/PhotoData";
import MobileFooterNav from "components/MobileFooterNav";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${Colors.BASE_BLUE};
  min-height: 100vh;
  width: 100%;
  color: ${Colors.WHITE};
  font-size: calc(10px + 2vmin);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  width: 100%;
  text-align: center;
`;

const App: React.FC = () => {
  const { authorized, setAuthState } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (isNil(authorized)) {
      authorize();
    }
  }, [authorized]);

  const authorize = () =>
    authorizeWithGoogle(handleAuthSuccess, handleAuthError);

  const handleAuthSuccess = () => setAuthState({ authorized: true });

  const handleAuthError = () => {
    console.log("Error authorizing with Google...");
    setAuthState({ authorized: false });
  };

  return (
    <Wrapper>
      <PhotoProvider>
        <Navigation />
        <Body>
          {authorized === false && (
            <LoginButton onLoginSuccess={handleAuthSuccess} />
          )}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/map" component={PhotoMap} />
            <Route exact path="/data" component={PhotoData} />
          </Switch>
        </Body>
        <MobileFooterNav />
      </PhotoProvider>
    </Wrapper>
  );
};

export default App;
