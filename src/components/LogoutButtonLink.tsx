import * as React from "react";
import styled from "styled-components";

import { googleLogout } from "utils/api";
import { ButtonLink } from "components/Button";
import { Spacing } from "styles/Base";

const Wrapper = styled.div`
  margin: ${Spacing.SMALL};
`;

interface Props {
  onLogout: () => void;
}

const LogoutButtonLink: React.FC<Props> = ({ onLogout }) => (
  <Wrapper>
    <ButtonLink onClick={() => googleLogout(onLogout)}>Sign Out</ButtonLink>
  </Wrapper>
);

export default LogoutButtonLink;
