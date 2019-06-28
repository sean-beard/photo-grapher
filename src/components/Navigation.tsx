import * as React from "react";
import styled from "styled-components";

import { Spacing } from "styles/Base";
import LogoutButtonLink from "./LogoutButtonLink";
import { Authorized } from "types/store";

const Nav = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: ${Spacing.LARGE};
`;

interface Props {
  authorized: Authorized["authorized"];
  onLogout: () => void;
}

const Navigation: React.FC<Props> = ({ authorized, onLogout }) => (
  <Nav>{authorized && <LogoutButtonLink {...{ onLogout }} />}</Nav>
);

export default Navigation;
