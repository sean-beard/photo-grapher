import * as React from "react";
import styled from "styled-components";

import { googleLogout } from "utils/api";
import { ButtonLink } from "components/Button";
import { Spacing } from "styles/Base";

const Wrapper = styled.div`
  margin: 0 ${Spacing.LARGE};
`;

const SmallButtonLink = styled(ButtonLink)`
  font-size: ${Spacing.SMALL};
`;

interface Props {
  onLogout: () => void;
}

const LogoutButtonLink: React.FC<Props> = ({ onLogout }) => (
  <Wrapper>
    <SmallButtonLink onClick={() => googleLogout(onLogout)}>
      Sign Out
    </SmallButtonLink>
  </Wrapper>
);

export default LogoutButtonLink;
