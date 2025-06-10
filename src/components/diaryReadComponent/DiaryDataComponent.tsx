import { useNavigate } from "react-router-dom";
import { EmotionBox } from "../../style/diaryReadPage.styles";
import { axiosInstance } from "../../utils/axiosInstance";
import axios from "axios";

type TEmotions = {
  name: string;
  emoji: string;
  tagColor: string;
  backgroundColor: string;
}

type TDiaryData = {
  title: string;
  emotion: string;
  createdAt: string;
  imageSrc: string;
}

const handleDelete = async () => {
  try {
    const response = await axiosInstance.delete('/api/diaries/delete?email=lee@mail.com&date=2025-06-09');
    console.log(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status, error.message)
    }

  }
}

export default function DiaryDataSection({ emotions, foundedData }: { emotions: TEmotions[], foundedData: TDiaryData | undefined }) {
  const navigate = useNavigate()
  if (typeof foundedData === undefined) {
    alert('해당 날짜에 작성된 읽기가 없습니다.');
    navigate('/main');
  }
  return (
    <>
      <div className="emotionPart">
        <span className="subTitle">{foundedData?.createdAt}의 기분</span>
        <div className="imageContainer">
          {
            emotions.map((e, i) => (
              <EmotionBox key={i} $tagcolor={e.tagColor} $selected={foundedData?.emotion === e.name}>
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
          <img src={foundedData?.imageSrc} alt="image" />
        </div>
      </div>
      <div className="buttonPart">
        <button onClick={handleDelete} className="delete">삭제하기</button>
        <button className="update">수정하기</button>
      </div>
    </>
  )
}
