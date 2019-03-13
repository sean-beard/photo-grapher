import styled from "styled-components";
import { Spacing, Colors } from "../styles/Base";

export const Button = styled.button`
  height: ${Spacing.LARGE};
  font-size: ${Spacing.NORMAL};
  min-width: 6.375rem;
  cursor: pointer;
  border-radius: 3px;
  background-color: ${Colors.ACTION_BLUE};
`;
