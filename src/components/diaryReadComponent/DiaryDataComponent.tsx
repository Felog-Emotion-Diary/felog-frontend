import { useNavigate } from "react-router-dom";
import { EmotionBox } from "../../style/diaryReadPage.styles";

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
        <button className="delete">삭제하기</button>
        <button className="update">수정하기</button>
      </div>
    </>
  )
}
