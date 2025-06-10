import { DiaryDataStyle, DiaryMarkdownStyle, EmotionBox, MarkdownPreviewStyle } from '../style/diaryReadPage.styles';
import MarkdownPreview from '@uiw/react-markdown-preview';
import emotions from '../../emotions.json';
import { useSearchParams } from "react-router-dom";
import DiaryDataSection, { type IDiaryData } from "../components/diaryReadComponent/DiaryDataComponent";
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';

export default function DiaryRead() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchedData, setFetchedData] = useState<IDiaryData | null>(null);

  const fetchData = async () => {
    try {
      const dateQurey = searchParams.get('date')?.toString();
      if (dateQurey) {
        const response = await axiosInstance(`/api/diaries/read?date=${dateQurey}`);
        setFetchedData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchParams])


  return (
    <>
      <DiaryMarkdownStyle>
        <span className="title">{fetchedData?.title}</span>
        <hr />
        <MarkdownPreview
          className="contents"
          source={fetchedData?.content}
          wrapperElement={{
            "data-color-mode": 'light'
          }}
          style={MarkdownPreviewStyle}
        />
      </DiaryMarkdownStyle>
      <DiaryDataStyle>
        <DiaryDataSection emotions={emotions} fetchedData={fetchedData} />
      </DiaryDataStyle>
    </>
  )
}
