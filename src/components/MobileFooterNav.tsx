import * as React from "react";
import styled from "styled-components";

import { Breakpoints, Colors } from "styles/Base";
import { Links } from "./Navigation";
import { PhotoContext, AuthContext } from "store";
import { hasItems } from "utils/data-operations";

export const MobileLinks = styled.footer`
  display: none;

  @media (${Breakpoints.MOBILE}) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${Colors.BASE_BLUE};
    height: 5rem;
    position: sticky;
    bottom: 0;
    z-index: 1;
  }
`;

export const MobileFooterNav: React.FC = () => {
  const { authorized } = React.useContext(AuthContext);
  const { photos } = React.useContext(PhotoContext);
  return (
    <>
      {authorized && hasItems(photos) && (
        <MobileLinks>
          <Links />
        </MobileLinks>
      )}
    </>
  );
};

export default MobileFooterNav;
