import * as React from "react";
import { Popup } from "react-leaflet";
import ProgressiveImage from "react-progressive-image";
import styled from "styled-components";

import Modal from "components/Modal";
import Loader, { LoaderWrapper } from "components/Loading";
import { Spacing, Colors, Breakpoints } from "styles/Base";

const ViewButtonWrapper = styled.div`
  display: flex;
`;

const ViewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${Spacing.MEDIUM};
`;

const Photo = styled.img`
  max-width: 50vw;
  width: 100%;

  @media (${Breakpoints.MOBILE}) {
    max-width: 85vw;
  }
`;

interface Props {
  photoId: string;
}

interface State {
  showModal: boolean;
}

const ImagePopup: React.FunctionComponent<Props> = ({ photoId }) => {
  const [showModal, setShowModal] = React.useState<State["showModal"]>(false);

  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  });

  return (
    <>
      <Popup>
        <ViewButtonWrapper>
          <ViewButton onClick={() => setShowModal(true)}>👀</ViewButton>
        </ViewButtonWrapper>
      </Popup>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          content: {
            backgroundColor: Colors.BASE_BLUE,
            border: "2px solid #282c34",
            borderRadius: "3px",
            padding: "0"
          }
        }}
      >
        <ProgressiveImage
          src={`https://docs.google.com/uc?id=${photoId}`}
          placeholder=""
        >
          {(src: string, loading: boolean) =>
            loading ? (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            ) : (
              <Photo src={src} alt="photo" />
            )
          }
        </ProgressiveImage>
      </Modal>
    </>
  );
};

export default ImagePopup;
