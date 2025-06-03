import type ReactModal from "react-modal";
import { backgroundStore } from "../store/backgroundColorStore";

export const customModalStyle = (): ReactModal.Styles => {
  const background = backgroundStore((state) => state.background);
  return {
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
      display: 'grid',
      gridTemplateColumns: '6fr 4fr',
      gridTemplateRows: '1fr',
      margin: '0 auto',
      width: '85%',
      height: '90%',
      backgroundColor: `${background}`
    }
  }
}
