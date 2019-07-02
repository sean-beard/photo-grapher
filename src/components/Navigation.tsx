import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { Spacing, Colors } from "styles/Base";
import LogoutButtonLink from "./LogoutButtonLink";
import { AuthContext, PhotoContext } from "store";
import { hasItems } from "utils/data-operations";

const Nav = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
`;

const Link = styled(NavLink)`
  color: ${Colors.WHITE};
  font-size: ${Spacing.NORMAL};
  text-decoration: none;
  transition: all 250ms ease;

  &:hover {
    color: ${Colors.ACTION_BLUE};
  }
`;

const DesktopLinks = styled.div`
  margin: 0 ${Spacing.LARGE};

  > ${Link} + ${Link} {
    margin-left: ${Spacing.NORMAL};
  }
`;

const routes: [string, string][] = [
  ["Home", "/"],
  ["Map", "/map"],
  ["Stats", "/data"]
];

const activeLinkStyle = {
  color: Colors.ACTION_BLUE,
  textDecoration: "underline"
};

export const Links: React.FC = () => (
  <>
    {routes.map(([label, path]) => (
      <Link key={path} exact to={path} activeStyle={activeLinkStyle}>
        {label}
      </Link>
    ))}
  </>
);

const Navigation: React.FC = () => {
  const { authorized, setAuthState } = React.useContext(AuthContext);
  const { photos } = React.useContext(PhotoContext);
  return (
    <Nav>
      {authorized && (
        <>
          <LogoutButtonLink
            onLogout={() => setAuthState({ authorized: false })}
          />
          {hasItems(photos) && (
            <DesktopLinks>
              <Links />
            </DesktopLinks>
          )}
        </>
      )}
    </Nav>
  );
};

export default Navigation;
