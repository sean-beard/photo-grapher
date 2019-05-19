import * as React from "react";
import styled from "styled-components";

import { AppState } from "App";
import { Spacing } from "styles/Base";
import LogoutButtonLink from "./LogoutButtonLink";

const Nav = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: ${Spacing.LARGE};
`;

interface Props {
  authorized: AppState["authorized"];
  onLogout: () => void;
}

const Navigation: React.FC<Props> = ({ authorized, onLogout }) => (
  <Nav>{authorized && <LogoutButtonLink {...{ onLogout }} />}</Nav>
);

export default Navigation;
