import styled from "styled-components";

import { Spacing, Colors } from "styles/Base";

export const Button = styled.button`
  height: ${Spacing.LARGE};
  font-size: ${Spacing.NORMAL};
  min-width: 6.375rem;
  cursor: pointer;
  border-radius: 3px;
  background-color: ${Colors.ACTION_BLUE};
`;

export const ButtonLink = styled.button`
  background: none;
  border: none;
  color: ${Colors.WHITE};
  cursor: pointer;
  font-size: ${Spacing.NORMAL};
  text-decoration: underline;
  transition: all 250ms ease;

  &:hover {
    color: ${Colors.ACTION_BLUE};
    text-decoration: none;
  }
`;
