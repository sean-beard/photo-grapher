import * as React from "react";

import { googleLogin } from "../utils/api";
import { Button } from "./Button";

interface Props {
  onLoginSuccess: () => void;
}

const LoginButton: React.SFC<Props> = ({ onLoginSuccess }) => (
  <Button onClick={() => googleLogin(onLoginSuccess)}>Sign In To Google</Button>
);

export default LoginButton;
