import { Container } from "../../style/diaryCard.styles";
import emotions from '../../../emotions.json'
import type { IPost } from "../weekGroupedComponent/weekGrouped";
import { ModalStore } from "../../store/ModalStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type DiaryCardProps = {
  post: IPost;
}

export const DiaryCard = ({ post }: DiaryCardProps) => {
  const [randomInt, setRandomInt] = useState(0);
  const getRandomInt = () => {
    return Math.floor(Math.random() * 100) + 1;
  }

  useEffect(() => {
    const randomNumber = getRandomInt();
    setRandomInt(randomNumber)
  }, [])
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
    <Container $backgroundColor={emotionInfo.backgroundColor} $imageUrl={post.img ? post.img : `https://picsum.photos/id/${randomInt}/300/300`} onClick={openModalHandle}>
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
