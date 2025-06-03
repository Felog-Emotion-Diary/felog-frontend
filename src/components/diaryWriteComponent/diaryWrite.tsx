import React, { useEffect, useState } from "react"
import { DataSection, EditorSection, EmotionBox, SubmitButton, UploadPictureBox } from "../../style/diaryWrite.styles"
import { backgroundStore } from "../../store/backgroundColorStore";
import MDEditor from "@uiw/react-md-editor";
import emotions from '../../../emotions.json'
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

type TDiary = {
  title: string | null;
  content: string | undefined;
  date?: string;
  emotion: string;
  imgUrl: string;
}

export default function DiaryWriteComponent() {
  const [selected, setSelected] = useState<number | null>(null);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [diaryValue, setDiaryValue] = useState<string | undefined>('');
  const setBackground = backgroundStore((state) => state.setBackground);
  const [searchParams, setSearchParams] = useSearchParams();
  const dateQurey = searchParams.get('date')?.toString();

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<TDiary>({
    defaultValues: {
      title: dateQurey,
      content: '',
      date: '',
      emotion: '',
      imgUrl: ''
    }
  });

  useEffect(() => {
    setValue('content', diaryValue);
    if (selected) {
      setValue('emotion', emotions[selected - 1].name)
    }
  }, [diaryValue, selected, setValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePath = URL.createObjectURL(file);
      setImagePath(imagePath);
      setValue('imgUrl', imagePath);
      setIsImageSelected(true);
    }
  }

  const emotionCheck = (color: string, i: number) => {
    setSelected(i);
    setBackground(color);
  }

  const diarySubmit: SubmitHandler<TDiary> = (data) => {
    console.log(data);
  }

  return (
    <>
      <EditorSection>
        <div className="editorBox" data-color-mode='light'>
          <input className="diaryTitle" placeholder={dateQurey} {...register('title')} />
          <MDEditor
            value={diaryValue}
            onChange={setDiaryValue}
            preview="edit"
            visibleDragbar={false}
            textareaProps={{
              placeholder: "오늘의 일기를 작성해주세요."
            }}
            height='100%'
          />
        </div>
      </EditorSection>
      <DataSection>
        <div>
          <span className="itemTitle">오늘의 기분은 어때요?</span>
          <div className="imageContainer">
            {
              emotions.map((e, i) => (
                <EmotionBox key={i} $selected={selected === i} $tagcolor={e.tagColor} onClick={() => emotionCheck(e.backgroundColor, i)}>
                  <span>{e.emoji}</span>
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
                  <span>이미지를 선택해주세요</span>
                </>
              )
            }
          </div>
          <label htmlFor="fileInput">이미지 첨부하기</label>
          <input type="file" id="fileInput" onChange={handleImageChange} />
        </UploadPictureBox>
        <SubmitButton onClick={handleSubmit(diarySubmit)}>작성하기</SubmitButton>
      </DataSection>
    </>
  )
}

