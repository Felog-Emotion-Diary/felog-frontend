//import { MdCheckBoxOutlineBlank } from "react-icons/md";
import {
  BetweenFlexbox,
  Button,
  Form,
  Input,
  InputFlexbox,
  PageMove,
  RowFlexbox,
  Title,
} from "../../style/signIn_Up.styles.ts";
import { overlayStore } from "../../store/signInStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { axiosInstance } from "../../utils/axiosInstance.tsx";
import { useNavigate } from "react-router-dom";

type TSignIn = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("옳지 않은 이메일입니다.")
    .required("필수 입력란입니다."),
  password: yup.string().required("필수 입력란입니다."),
});

export default function SignIn() {
  const setIsLogin = overlayStore((state) => state.setIsLogin);
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(["rememberId"], {
    doNotParse: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setValue("email", cookies.rememberId);
      setIsRemember(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TSignIn>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onLogin: SubmitHandler<TSignIn> = async (data) => {
    try {
      const response = await axiosInstance.post("/api/users/login", data);
      const token = response.data.user.token;
      localStorage.setItem("userToken", token);
      console.log("로그인 성공", response);
      console.log("response.data", response.data);
      navigate("/main");
    } catch (err) {
      console.error("로그인 실패", err);
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      setCookies("rememberId", getValues("email"), { maxAge: 2000 });
    } else {
      removeCookies("rememberId");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("email", e.target.value);
    if (isRemember) {
      setCookies("rememberId", e.target.value, { maxAge: 2000 });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onLogin)}>
      <Title>로그인</Title>
      <InputFlexbox>
        <span>{errors.email?.message}</span>
        <Input
          type="text"
          placeholder="이메일"
          {...register("email")}
          onChange={handleEmailChange}
        />
        <span>{errors.password?.message}</span>
        <Input
          type="password"
          placeholder="비밀번호"
          {...register("password")}
        />
      </InputFlexbox>
      <BetweenFlexbox>
        <label htmlFor="rememberId">
          <input
            type="checkbox"
            id="rememberId"
            onChange={handleChange}
            checked={isRemember}
          />
          <span>아이디 저장</span>
        </label>
        <RowFlexbox>
          <PageMove type="button" onClick={() => navigate("/check-email")}>
            비밀번호 찾기
          </PageMove>

          <PageMove type="button" onClick={setIsLogin}>
            회원가입
          </PageMove>
        </RowFlexbox>
      </BetweenFlexbox>
      <Button type="submit">로그인</Button>
    </Form>
  );
}
