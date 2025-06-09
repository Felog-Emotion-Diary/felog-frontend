import { useEffect, useState } from "react";
import { DiaryDataStyle, DiaryMarkdownStyle, EmotionBox, MarkdownPreviewStyle } from '../style/diaryReadPage.styles';
import MarkdownPreview from '@uiw/react-markdown-preview';
import emotions from '../../emotions.json';
import testData from '../../diaryReadTestData.json';
import { useSearchParams } from "react-router-dom";
import { backgroundStore } from "../store/backgroundColorStore";
import DiaryDataSection from "../components/diaryReadComponent/DiaryDataComponent";
import { axiosInstance } from "../utils/axiosInstance";
import axios from "axios";

export default function DiaryRead() {
  const [example, setExample] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [diaryData, setDiaryData] = useState();
  const dateQurey = searchParams.get('date')?.toString();
  // const foundedData = testData.find(d => d.createdAt === dateQurey);

  const setBackground = backgroundStore((state) => state.setBackground)

  useEffect(() => {
    // fetch('../../example.md')
    //   .then(res => res.text())
    //   .then(text => setExample(text));
    // const foundedEmotionData = emotions.find(d => d.name === foundedData?.emotion);
    // if (foundedEmotionData) {
    //   setBackground(foundedEmotionData?.backgroundColor);
    // }
  }, [dateQurey]);

  return (
    <>
      <DiaryMarkdownStyle>
        <span className="title">title</span>
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
        <DiaryDataSection emotions={emotions} />
      </DiaryDataStyle>
    </>
  )
}
