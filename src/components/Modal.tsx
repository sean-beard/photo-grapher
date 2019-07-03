import * as React from "react";
import ReactModal from "react-modal";

import { Spacing } from "styles/Base";

/**
 * @prop children - React node to be used as modal content.
 * @prop fullScreen - Whether or not the modal should be full screen.
 * @prop style - Styling override.
 */
interface OwnProps {
  children: React.ReactNode;
  fullScreen?: boolean;
  style?: ReactModal.Styles;
}

type Props = ReactModal.Props & OwnProps;

// Hides app from screenreaders and other assistive tech while the modal is open
if (process.env.NODE_ENV !== "test") {
  ReactModal.setAppElement("#root");
}

export const Modal = (props: Props) => {
  const { children, fullScreen, style } = props;

  const content = style ? style.content : {};
  const overlay = style ? style.overlay : {};

  const defaultStyles = {
    overlay: {
      display: "flex",
      backgroundColor: "rgba(74, 72, 68, 0.2)",
      padding: Spacing.SMALL,
      zIndex: 5
    },
    content: {
      alignSelf: "center",
      background: "white",
      border: "none",
      borderRadius: "none",
      outline: "none",
      padding: Spacing.XLARGE,
      position: "relative",
      left: "auto",
      right: "auto",
      top: "auto",
      bottom: "auto",
      margin: "0 auto"
    }
  };
  const fullScreenStyles = {
    content: {
      padding: 0,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  };

  return (
    <ReactModal
      {...props}
      style={{
        ...style,
        overlay: { ...defaultStyles.overlay, ...overlay },
        content: {
          ...defaultStyles.content,
          ...(fullScreen ? fullScreenStyles.content : {}),
          ...content
        }
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
