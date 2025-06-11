import React, { useEffect, useRef, useState } from "react"
import { DataSection, EditorSection, EmotionBox, SubmitButton, UploadPictureBox } from "../../style/diaryWrite.styles"
import { backgroundStore } from "../../store/backgroundColorStore";
import MDEditor from "@uiw/react-md-editor";
import emotions from "../../../emotions.json";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { axiosInstance } from "../../utils/axiosInstance";
import axios from "axios";
import { updateStore } from "../../store/updateStore";

export interface IDiary {
  title: string;
  content: string;
  emotionId: number;
  img: string;
  status: string;
}

const schema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  emotionId: yup.number().required(),
  img: yup.string().required(),
  status: yup.string().required(),
});

export default function DiaryWriteComponent() {
  const [selected, setSelected] = useState<number>(-1);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [diaryValue, setDiaryValue] = useState<string | undefined>("");
  const setBackground = backgroundStore((state) => state.setBackground);
  const navigate = useNavigate();
  const timeRef = useRef<NodeJS.Timeout | null>(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const dateQurey = searchParams.get('date')?.toString();
  const fetchedData = updateStore((state) => state.fetchedData);
  const setFetchedData = updateStore((state) => state.setFetchedData);

  const { register, setValue, handleSubmit, getValues, formState: { isValid } } = useForm<IDiary>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      title: dateQurey,
      content: "",
      emotionId: 0,
      img: "",
      status: "TEMP",
    },
  });

  const updateValues = () => {
    if (fetchedData) {
      setIsImageSelected(true);
      setImagePath(fetchedData.img);
      setSelected(fetchedData.emotion);
      setDiaryValue(fetchedData.content);
      setValue('title', fetchedData?.title);
      setValue('img', fetchedData?.img || '');
      setValue('content', fetchedData?.content);
      setValue('emotionId', fetchedData?.emotion);
    }
  }

  useEffect(() => {
    updateValues();
  }, [])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePath = URL.createObjectURL(file);
      setImagePath(imagePath);
      setValue("img", imagePath, { shouldValidate: true });
      setIsImageSelected(true);

      try {
        const formData = new FormData();
        formData.append('image', file);

        const imgRes = await axiosInstance.post(`/api/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        const realImageData = imgRes.data.url;
        setValue('img', realImageData);
      } catch (error) {
        console.log(error);
      }

    }
  };

  const emotionCheck = (color: string, i: number, code: number) => {
    setSelected(code);
    setValue('emotionId', emotions[i].code, { shouldValidate: true })
    setBackground(color);
  };

  const diarySubmit: SubmitHandler<IDiary> = async (data) => {
    console.log(data);
    try {
      setValue('status', 'PUBLISHED');
      const response = await axiosInstance.put(`/api/diaries/write?date=${dateQurey}`, data);
      console.log(response);
      if (fetchedData) {
        alert('일기가 수정되었습니다!');
      } else {
        alert('일기가 작성되었습니다!');
        setFetchedData(null);
      }
      navigate('/main')
    } catch (error) {
      setValue("status", "TEMP");
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status, error.message);
      }
    }
  };

  useEffect(() => {
    const tempDataCheck = async () => {
      if (!dateQurey) return;
      try {
        const response = await axiosInstance(`/api/diaries?date=${dateQurey}`);
        const data = response.data
        if (data) {
          setValue('title', data.title);
          setValue('content', data.content);
          setValue('emotionId', data.emotionId);
          setValue('img', data.img);
          setValue('status', 'TEMP');

          setDiaryValue(data.content);
          setImagePath(data.img);
          setSelected(data.emotionId);
        }
      } catch (error) {
        console.log('불러오기 실패', error);
      }
    }

    tempDataCheck();
  }, [dateQurey])

  useEffect(() => {
    const status = getValues('status');
    if (status === 'TEMP') {
      timeRef.current = setInterval(() => {
        const currentStatus = getValues('status');
        if (currentStatus !== 'TEMP' || !isValid) return;

        const allData = getValues();
        axiosInstance.put('/api/diaries/write', allData)
          .then(() => console.log('자동저장 완료'))
          .catch((err) => console.log('자동저장 실패'));
      }, 120_000);
    }

    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, [getValues, isValid, dateQurey])

  return (
    <>
      <EditorSection>
        <div className="editorBox" data-color-mode="light">
          <input
            className="diaryTitle"
            placeholder={dateQurey}
            {...register("title")}
          />
          <MDEditor
            value={diaryValue}
            onChange={(content) => {
              setDiaryValue(content);
              setValue("content", content ?? "", {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            preview="edit"
            visibleDragbar={false}
            textareaProps={{
              placeholder: "오늘의 일기를 작성해주세요.",
            }}
            height="100%"
          />
        </div>
      </EditorSection>
      <DataSection>
        <div>
          <span className="itemTitle">오늘의 기분은 어때요?</span>
          <div className="imageContainer">
            {
              emotions.map((e, i) => (
                <EmotionBox key={i} $selected={selected === e.code} $tagcolor={e.tagColor} onClick={() => emotionCheck(e.backgroundColor, i, e.code)}>
                  <img src={e.emoji} />
                  <span className="emotionTag">{e.name}</span>
                </EmotionBox>
              ))
            }
          </div>
        </div>
        <UploadPictureBox $path={imagePath}>
          <span className="itemTitle">사진 첨부</span>
          <div className={isImageSelected ? "preview" : "addImage"}>
            {isImageSelected ? (
              <></>
            ) : (
              <>
                <span>이미지를 선택해주세요</span>
              </>
            )}
          </div>
          <label htmlFor="fileInput">이미지 첨부하기</label>
          <input type="file" id="fileInput" onChange={handleImageChange} />
        </UploadPictureBox>
        <SubmitButton onClick={handleSubmit(diarySubmit)} aria-disabled={!isValid}>{fetchedData ? '수정하기' : '작성하기'}</SubmitButton>
      </DataSection>
    </>
  );
}
