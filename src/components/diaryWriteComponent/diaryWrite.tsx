import React, { useEffect, useState } from "react"
import { DataSection, EditorSection, EmotionBox, SubmitButton, UploadPictureBox } from "../../style/diaryWrite.styles"
import { backgroundStore } from "../../store/backgroundColorStore";
import MDEditor from "@uiw/react-md-editor";
import emotions from '../../../emotions.json'
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

type TDiary = {
  title: string;
  content: string;
  date: string;
  emotion: string;
  imgUrl: string;
}

const schema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  date: yup.string().required(),
  emotion: yup.string().required(),
  imgUrl: yup.string().required(),
})

export default function DiaryWriteComponent() {
  const [selected, setSelected] = useState<number>(-1);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [diaryValue, setDiaryValue] = useState<string | undefined>('');
  const setBackground = backgroundStore((state) => state.setBackground);
  const [searchParams, setSearchParams] = useSearchParams();
  const dateQurey = searchParams.get('date')?.toString();

  const { register, setValue, handleSubmit, formState: { errors, isValid } } = useForm<TDiary>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      title: dateQurey,
      content: '',
      date: dateQurey,
      emotion: '',
      imgUrl: ''
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePath = URL.createObjectURL(file);
      setImagePath(imagePath);
      setValue('imgUrl', imagePath, { shouldValidate: true });
      setIsImageSelected(true);
    }
  }

  const emotionCheck = (color: string, i: number) => {
    setSelected(i);
    setValue('emotion', emotions[i].name, { shouldValidate: true })
    setBackground(color);
  }

  const diarySubmit: SubmitHandler<TDiary> = (data) => {
    console.log(data);
    console.log(selected);
    console.log(emotions[selected].name);
    console.log(isValid);
    console.log(errors);
  }

  return (
    <>
      <EditorSection>
        <div className="editorBox" data-color-mode='light'>
          <input className="diaryTitle" placeholder={dateQurey} {...register('title')} />
          <MDEditor
            value={diaryValue}
            onChange={(content) => {
              setDiaryValue(content);
              setValue('content', content ?? '', {
                shouldDirty: true,
                shouldValidate: true
              })
            }}
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
                  <img src={e.emoji} />
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
        <SubmitButton onClick={handleSubmit(diarySubmit)} aria-disabled={!isValid}>작성하기</SubmitButton>
      </DataSection>
    </>
  )
}

