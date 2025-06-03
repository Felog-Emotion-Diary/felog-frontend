import DiaryWriteComponent from "../../components/diaryWriteComponent/diaryWriteComponent";
import { backgroundStore } from "../../store/emotionBackgroundColorStore";
import { Container } from "./diaryWrite.styles";

export default function DiaryWrite() {
  const background = backgroundStore((state) => state.background)

  return (
    <Container $background={background}>
      <DiaryWriteComponent />
    </Container>
  )
}
