import * as React from "react";
import { Popup } from "react-leaflet";
import ProgressiveImage from "react-progressive-image";
import styled from "styled-components";

import Modal from "components/Modal";
import Loader from "components/Loading";
import { Spacing, Colors } from "styles/Base";

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
`;

const LoaderWrapper = styled.div`
  align-items: center;
  background-color: ${Colors.BASE_BLUE};
  display: flex;
  height: 150px;
  justify-content: center;
  margin: 0 auto;
  width: 50vw;
`;

interface Props {
  photoId: string;
}

interface State {
  showModal: boolean;
}

const ImagePopup: React.FunctionComponent<Props> = ({ photoId }) => {
  const [showModal, setShowModal] = React.useState<State["showModal"]>(false);
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
