import React, { useState } from "react"
import { DataSection, EditorSection, EmotionBox, SubmitButton, UploadPictureBox } from "./diaryWriteComponent.styles"
import { FaRegImage } from "react-icons/fa6";

const emotions = [
  {
    name: '기쁨',
    imgSrc: '/emotions/happy.png',
    tagColor: '#FFD43B',
    backgroundColor: '#FFF2C1'
  },
  {
    name: '슬픔',
    imgSrc: '/emotions/sad.png',
    tagColor: '#4D4DFF',
    backgroundColor: '#CADBFF'
  },
  {
    name: '분노',
    imgSrc: '/emotions/angry.png',
    tagColor: '#FF6B6B',
    backgroundColor: '#FFD3D3'
  },
  {
    name: '불안',
    imgSrc: '/emotions/anxious.png',
    tagColor: '#6A89CC',
    backgroundColor: '#CBCBFF'
  },
  {
    name: '설렘',
    imgSrc: '/emotions/exciting.png',
    tagColor: '#FEC260',
    backgroundColor: '#FFDFA9'
  },
  {
    name: '무덤덤',
    imgSrc: '/emotions/normal.png',
    tagColor: '#B0BEC5',
    backgroundColor: '#B0BEC5'
  },
  {
    name: '편안함',
    imgSrc: '/emotions/safe.png',
    tagColor: '#A3D9A5',
    backgroundColor: '#E3F4E4'
  },
]

export default function DiaryWriteComponent() {
  const [selected, setSelected] = useState<number | null>(null);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePath = URL.createObjectURL(file);
      setImagePath(imagePath);
      setIsImageSelected(true);
    }
  }

  return (
    <>
      <EditorSection>
        에디터가 들어갈 자리입니다.
      </EditorSection>
      <DataSection>
        <div>
          <span className="itemTitle">오늘의 기분은 어때요?</span>
          <div className="imageContainer">
            {
              emotions.map((e, i) => (
                <EmotionBox key={i} $selected={selected === i} $tagcolor={e.tagColor} $backgroundcolor={e.backgroundColor} onClick={() => setSelected(i)}>
                  <img src={e.imgSrc} />
                  <span className="emotionTag">{e.name}</span>
                </EmotionBox>
              ))
            }
          </div>
        </div>
        <UploadPictureBox $path={imagePath}>
          <span className="itemTitle">사진 첨부</span>
          <div className={isImageSelected ? 'preview' : 'addImage'}>
            {
              isImageSelected ? (
                <>
                </>
              ) : (
                <>
                  <FaRegImage />
                  <span>이미지를 선택해주세요</span>
                </>
              )
            }
          </div>
          <label htmlFor="fileInput">이미지 첨부하기</label>
          <input type="file" id="fileInput" onChange={handleImageChange} />
        </UploadPictureBox>
        <SubmitButton>작성하기</SubmitButton>
      </DataSection>
    </>
  )
}
