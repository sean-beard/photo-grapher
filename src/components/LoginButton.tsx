import * as React from "react";
import styled from "styled-components";

import { googleLogin } from "utils/api";
import { Button } from "components/Button";
import { Spacing } from "styles/Base";

const Wrapper = styled.div`
  margin: ${Spacing.SMALL};
`;

interface Props {
  onLoginSuccess: () => void;
}

const LoginButton: React.FC<Props> = ({ onLoginSuccess }) => (
  <Wrapper>
    <Button onClick={() => googleLogin(onLoginSuccess)}>
      Sign In To Google
    </Button>
  </Wrapper>
);

export default LoginButton;
