import ReactModal from 'react-modal';
import './App.css'
import Router from './router/router'
import { ModalStore } from './store/ModalStore';
import DiaryRead from './pages/diaryReadPage';
import { customModalStyle } from './style/modal.styles';
import { IoIosClose } from "react-icons/io";

ReactModal.setAppElement('#root');

function App() {
  const isOpen = ModalStore((state) => state.isOpen);
  const setModalClose = ModalStore((state) => state.setModalClose)
  const handleClick = () => {
    setModalClose();
  }
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        style={customModalStyle()}
      >
        <IoIosClose className='modalExit' onClick={handleClick} />
        <DiaryRead />
      </ReactModal>
      <Router />
    </>
  )
}

export default App;
