import * as React from "react";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

import { Colors, Breakpoints } from "styles/Base";
import Modal from "./Modal";

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.BASE_BLUE};
  height: 150px;
  width: 50vw;

  @media (${Breakpoints.MOBILE}) {
    width: 85vw;
  }
`;

const Loader = () => <PacmanLoader color={Colors.ACTION_BLUE} />;

interface Props {
  isLoading: boolean;
}

export const ModalLoader: React.FC<Props> = ({ isLoading }) => (
  <Modal
    isOpen={isLoading}
    style={{
      content: {
        backgroundColor: Colors.BASE_BLUE,
        border: `2px solid ${Colors.BASE_BLUE}`,
        borderRadius: "3px",
        padding: "0"
      }
    }}
  >
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  </Modal>
);

export default Loader;
