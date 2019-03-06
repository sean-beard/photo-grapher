import * as React from "react";
import { Popup } from "react-leaflet";
import ProgressiveImage from "react-progressive-image";
import styled from "styled-components";

import Modal from "./Modal";
import Loader from "./Loading";

const ViewButtonWrapper = styled.div`
  display: flex;
`;

const ViewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
`;

const Photo = styled.img`
  max-width: 50vw;
  width: 100%;
`;

const LoaderWrapper = styled.div`
  align-items: center;
  background-color: #282c34;
  display: flex;
  height: 150px;
  justify-content: center;
  margin: 0 auto;
  width: 50vw;
`;

interface OwnProps {
  photoId: string;
}

type Props = OwnProps;

interface State {
  showModal: boolean;
}

class ImagePopup extends React.Component<Props, State> {
  state: State = {
    showModal: false
  };
  render() {
    const { showModal } = this.state;
    const { photoId } = this.props;
    return (
      <>
        <Popup>
          <ViewButtonWrapper>
            <ViewButton onClick={() => this.setState({ showModal: true })}>
              👀
            </ViewButton>
          </ViewButtonWrapper>
        </Popup>
        <Modal
          isOpen={showModal}
          onRequestClose={() => this.setState({ showModal: false })}
          style={{
            content: {
              backgroundColor: "#282c34",
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
            {(src: string, loading: boolean) => {
              return loading ? (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              ) : (
                <Photo src={src} alt="photo" />
              );
            }}
          </ProgressiveImage>
        </Modal>
      </>
    );
  }
}

export default ImagePopup;
