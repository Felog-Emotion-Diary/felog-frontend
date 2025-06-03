import ReactModal from 'react-modal';
import './App.css'
import Router from './router/router'
import { ModalStore } from './store/ModalStore';
import DiaryRead from './pages/diaryReadPage';
import { customModalStyle } from './style/modal.styles';

ReactModal.setAppElement('#root');

function App() {
  const isOpen = ModalStore((state) => state.isOpen);
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        style={customModalStyle}
      >
        <DiaryRead />
      </ReactModal>
      <Router />
    </>
  )
}

export default App;
