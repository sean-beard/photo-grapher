import styled from "styled-components";

import { Spacing, Colors } from "styles/Base";

export const Button = styled.button`
  height: ${Spacing.LARGE};
  font-size: ${Spacing.NORMAL};
  min-width: 6.375rem;
  cursor: pointer;
  border-radius: 3px;
  background-color: ${Colors.ACTION_BLUE};

  &:disabled {
    color: ${Colors.BASE_BLUE};
    background-color: ${Colors.DISABLED_GRAY};
    cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  }
`;

export const ButtonLink = styled.button`
  background: none;
  border: none;
  color: ${Colors.WHITE};
  cursor: pointer;
  font-size: ${Spacing.NORMAL};
  text-decoration: underline;
  transition: all 250ms ease;
  margin: ${Spacing.MICRO} 0;
  padding: 0;

  &:hover {
    color: ${Colors.ACTION_BLUE};
    text-decoration: none;
  }
`;
