import * as React from "react";
import styled from "styled-components";

import { googleLogin } from "../utils/api";
import { Button } from "./Button";

const Wrapper = styled.div`
  margin: 1rem;
`;

interface Props {
  onLoginSuccess: () => void;
}

const LoginButton: React.SFC<Props> = ({ onLoginSuccess }) => (
  <Wrapper>
    <Button onClick={() => googleLogin(onLoginSuccess)}>
      Sign In To Google
    </Button>
  </Wrapper>
);

export default LoginButton;
