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

interface Props {
  onLogout: () => void;
}

const Navigation: React.FC<Props> = ({ onLogout }) => {
  const { authorized } = React.useContext(AuthContext);
  return <Nav>{authorized && <LogoutButtonLink {...{ onLogout }} />}</Nav>;
};

export default Navigation;
