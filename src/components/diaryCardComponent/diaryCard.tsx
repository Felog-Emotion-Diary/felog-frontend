import { Container } from "../../style/diaryCard.styles";
import emotions from '../../../emotions.json'
import type { IPost } from "../weekGroupedComponent/weekGrouped";
import { ModalStore } from "../../store/ModalStore";
import { useNavigate, useSearchParams } from "react-router-dom";

type DiaryCardProps = {
  post: IPost;
}

export const DiaryCard = ({ post }: DiaryCardProps) => {
  const [emotionInfo] = emotions.filter((emotion) => emotion.code === post.emotion)
  const setModalOpen = ModalStore((state) => state.setModalOpen);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const openModalHandle = () => {
    console.log(post.date);
    navigate(`?date=${post.date}`)
    setModalOpen();
  }

  return (
    <Container $backgroundColor={emotionInfo.backgroundColor} onClick={openModalHandle}>
      <div className="imageBox">
      </div>
      <div className="contentBox">
        <div className="titleBox">
          <span className="title">{post.title}</span>
        </div>
        <div className="dateBox">
          <span className="date">{post.date}</span>
        </div>
      </div>
    </Container>
  )
}
