import React, { useEffect, useState } from "react";
import {
  DataSection,
  EditorSection,
  EmotionBox,
  SubmitButton,
  UploadPictureBox,
} from "../../style/diaryWrite.styles";
import { backgroundStore } from "../../store/backgroundColorStore";
import MDEditor from "@uiw/react-md-editor";
import emotions from "../../../emotions.json";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { axiosInstance } from "../../utils/axiosInstance";
import axios from "axios";

interface IDiary {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const dateQurey = searchParams.get("date")?.toString();
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IDiary>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: dateQurey,
      content: "",
      emotionId: 0,
      img: "",
      status: "TEMP",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePath = URL.createObjectURL(file);
      setImagePath(imagePath);
      setValue("img", imagePath, { shouldValidate: true });
      setIsImageSelected(true);
    }
  };

  const emotionCheck = (color: string, i: number) => {
    setSelected(i);
    setValue("emotionId", emotions[i].code, { shouldValidate: true });
    setBackground(color);
  };

  const diarySubmit: SubmitHandler<IDiary> = async (data) => {
    console.log(data);
    try {
      setValue("status", "PUBLISHED");
      const response = await axiosInstance.put(
        `/api/diaries/write?date=${dateQurey}`,
        data
      );
      console.log(response);
      alert("일기가 작성되었습니다!");
      navigate("/main");
    } catch (error) {
      setValue("status", "TEMP");
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status, error.message);
      }
    }
  };

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
            {emotions.map((e, i) => (
              <EmotionBox
                key={i}
                $selected={selected === i}
                $tagcolor={e.tagColor}
                onClick={() => emotionCheck(e.backgroundColor, i)}
              >
                <img src={e.emoji} />
                <span className="emotionTag">{e.name}</span>
              </EmotionBox>
            ))}
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
        <SubmitButton
          onClick={handleSubmit(diarySubmit)}
          aria-disabled={!isValid}
        >
          작성하기
        </SubmitButton>
      </DataSection>
    </>
  );
}
