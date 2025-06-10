import { useNavigate, useSearchParams } from "react-router-dom";
import { EmotionBox } from "../../style/diaryReadPage.styles";
import { axiosInstance } from "../../utils/axiosInstance";
import axios from "axios";
import { useEffect } from "react";
import { backgroundStore } from "../../store/backgroundColorStore";
import { updateStore } from "../../store/updateStore";
import { ModalStore } from "../../store/ModalStore";

interface IEmotions {
  name: string;
  emoji: string;
  tagColor: string;
  backgroundColor: string;
  code: number;
}

export interface IDiaryData {
  title: string;
  emotion: number;
  date: string;
  img: string | null;
  content: string;
}


export default function DiaryDataSection({ emotions, fetchedData }: { emotions: IEmotions[], fetchedData: IDiaryData | null }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const dateQurey = searchParams.get('date')?.toString();
  const setBackground = backgroundStore((state) => state.setBackground)
  const setFetchedData = updateStore((state) => state.setFetchedData)
  const setModalClose = ModalStore((state) => state.setModalClose);

  useEffect(() => {
    const filteredEmotion = emotions.filter((i) => i.code === fetchedData?.emotion);
    setBackground(filteredEmotion[0]?.backgroundColor)
  }, [fetchedData])

  const handleDelete = async () => {
    if (confirm('삭제된 일기는 복구가 불가능합니다.\n일기를 삭제하시겠습니까?')) {
      try {
        const response = await axiosInstance.delete(`/api/diaries/delete?date=${dateQurey}`);
        console.log(response);
        alert('일기가 삭제되었습니다.');
        navigate(-1)
        setModalClose();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert('잠시 후 다시 시도해주세요.');
          console.log(error.response?.status, error.message);
        }
      }
    } else {
      return;
    }
  }

  const handleUpdate = () => {
    if (fetchedData) {
      setFetchedData(fetchedData);
      navigate(`/write?date=${fetchedData?.date}`);
      setModalClose();
    }
  }

  return (
    <>
      <div className="emotionPart">
        <span className="subTitle">{fetchedData?.date}의 기분</span>
        <div className="imageContainer">
          {
            emotions.map((e, i) => (
              <EmotionBox key={i} $tagcolor={e.tagColor} $selected={fetchedData?.emotion === e.code}>
                <img src={e.emoji} />
                <span className="emotionTag">{e.name}</span>
              </EmotionBox>
            ))
          }
        </div>
      </div>
      <div className="uploadedImagePart">
        <span className="subTitle pic">대표 사진</span>
        <div className="uploadedImageContainer">
          <img src={fetchedData?.img || '/defaultImage.jpg'} alt="image" />
        </div>
      </div>
      <div className="buttonPart">
        <button onClick={handleDelete} className="delete">삭제하기</button>
        <button className="update" onClick={handleUpdate}>수정하기</button>
      </div>
    </>
  )
}
