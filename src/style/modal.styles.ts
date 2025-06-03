import type ReactModal from "react-modal";

export const customModalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100vw',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  content: {

  }
}
