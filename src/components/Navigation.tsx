import * as React from "react";
import styled from "styled-components";

import { Spacing } from "styles/Base";
import LogoutButtonLink from "./LogoutButtonLink";
import { AuthContext } from "store";

const Nav = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: ${Spacing.LARGE};
`;

const Navigation: React.FC = () => {
  const { authorized, setAuthState } = React.useContext(AuthContext);
  return (
    <Nav>
      {authorized && (
        <LogoutButtonLink
          onLogout={() => setAuthState({ authorized: false })}
        />
      )}
    </Nav>
  );
};

export default Navigation;
