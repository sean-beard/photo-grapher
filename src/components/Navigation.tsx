import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import logo from "assets/favicon.png";
import { Spacing, Colors, Breakpoints } from "styles/Base";
import LogoutButtonLink from "./LogoutButtonLink";
import { AuthContext, PhotoContext } from "store";
import { hasItems } from "utils/data-operations";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Spacing.SMALL} ${Spacing.MEDIUM} ${Spacing.MICRO} ${Spacing.MEDIUM};

  @media (${Breakpoints.TABLET}) {
    padding: ${Spacing.MICRO} ${Spacing.SMALL};
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  background-color: ${Colors.BASE_BLUE};
  position: sticky;
  top: 0;
  z-index: 1;

  @media (${Breakpoints.MOBILE}) {
    height: ${Spacing.LARGE};
  }
`;

const LogoTagline = styled.div`
  display: flex;
  align-content: center;
`;

const Title = styled.h1`
  font-size: 25px;
  margin: 0;

  @media (${Breakpoints.TABLET}) {
    display: none;
  }
`;

const Tagline = styled.small`
  font-size: 16px;

  @media (${Breakpoints.TABLET}) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 50px;
  border-right: 1px solid ${Colors.ACTION_BLUE};
  padding-right: ${Spacing.SMALL};
  margin-right: ${Spacing.SMALL};

  @media (${Breakpoints.TABLET}) {
    border-right: none;
    padding-right: 0;
    margin-right: 0;
  }
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
  > ${Link} + ${Link} {
    margin-left: ${Spacing.NORMAL};
  }

  @media (${Breakpoints.MOBILE}) {
    display: none;
  }
`;

const routes: [string, string][] = [
  ["Home", "/"],
  ["Map", "/map"],
  ["Stats", "/data"]
];

const activeLinkStyle = {
  color: Colors.ACTION_BLUE,
  textDecoration: "underline",
  cursor: "default"
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
    <Header>
      <LogoTagline>
        <Logo alt="logo" src={logo} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "300px"
          }}
        >
          <Title>PhotoGrapher</Title>
          <Tagline>Get the most out of your photo data</Tagline>
        </div>
      </LogoTagline>
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
    </Header>
  );
};

export default Navigation;
