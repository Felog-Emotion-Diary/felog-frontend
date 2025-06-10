import { Button, FormContainer, FullPage, Input } from "../style/PasswordStyle";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { axiosInstance } from "../utils/axiosInstance";

function CheckEmail() {
  const [email, setEmail] = useState("");
  //const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await axiosInstance.post(`/api/users/reset`, { email });
      alert("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message || "에러가 발생했습니다");
      //navigate("/reset-password");
    }
  };

  return (
    <FullPage>
      <FormContainer>
        <h1>재설정 메일 확인</h1>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleClick}>확인</Button>
      </FormContainer>
    </FullPage>
  );
}

export default CheckEmail;
