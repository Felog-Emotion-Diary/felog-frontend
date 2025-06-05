import { useEffect, useState } from "react";
import { DiaryDataStyle, DiaryMarkdownStyle, EmotionBox, MarkdownPreviewStyle } from '../style/diaryReadPage.styles';
import MarkdownPreview from '@uiw/react-markdown-preview';
import emotions from '../../emotions.json';
import testData from '../../diaryReadTestData.json';
import { useSearchParams } from "react-router-dom";
import { backgroundStore } from "../store/backgroundColorStore";

export default function DiaryRead() {
  const [example, setExample] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const dateQurey = searchParams.get('date')?.toString();
  const foundedData = testData.find(d => d.createdAt === dateQurey);

  const setBackground = backgroundStore((state) => state.setBackground)
  // const foundedEmotionData = emotions.find(d => d.name === foundedData?.emotion);
  // if (foundedEmotionData) {
  //   setBackground(foundedEmotionData?.backgroundColor);
  // }

  useEffect(() => {
    fetch('../../example.md')
      .then(res => res.text())
      .then(text => setExample(text));
    const foundedEmotionData = emotions.find(d => d.name === foundedData?.emotion);
    if (foundedEmotionData) {
      setBackground(foundedEmotionData?.backgroundColor);
    }
  }, [dateQurey]);

  return (
    <>
      <DiaryMarkdownStyle>
        <span className="title">{foundedData?.title}</span>
        <hr />
        <MarkdownPreview
          className="contents"
          source={example}
          wrapperElement={{
            "data-color-mode": 'light'
          }}
          style={MarkdownPreviewStyle}
        />
      </DiaryMarkdownStyle>
      <DiaryDataStyle>
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
      </DiaryDataStyle>
    </>
  )
}
