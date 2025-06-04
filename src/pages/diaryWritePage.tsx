import { AiOutlineArrowLeft } from "react-icons/ai";
import DiaryWriteComponent from "../components/diaryWriteComponent/diaryWrite";
import { backgroundStore } from "../store/backgroundColorStore";
import { Container, ExitButton } from "../style/diaryWritePage.styles";
import { useNavigate } from "react-router-dom";

export default function DiaryWrite() {
  const background = backgroundStore((state) => state.background)
  const reset = backgroundStore((state) => state.reset)
  const navigate = useNavigate();
  const exitDiary = () => {
    if (confirm('일기 작성을 취소하고 메인화면으로 돌아갈까요?')) {
      navigate('/main');
      reset();
    } else {
      return;
    }
  }

  return (
    <Container $background={background}>
      <ExitButton onClick={exitDiary}>
        <AiOutlineArrowLeft />
      </ExitButton>
      <DiaryWriteComponent />
    </Container>
  )
}

