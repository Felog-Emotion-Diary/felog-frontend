import { useState } from "react";
import { Button, FormContainer, FullPage, Input } from "../style/PasswordStyle";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../utils/axiosInstance";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axiosInstance.post(`/api/users/reset/${token}`, {
        newPassword: password,
      });
      alert("비밀번호가 변경되었습니다.");
      navigate("/sign");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "비밀번호 변경 실패");
      } else {
        setErrorMessage("오류가 발생했습니다.");
      }
    }
  };

  return (
    <FullPage>
      <FormContainer>
        <h1>비밀번호 재설정</h1>
        <Input
          type="password"
          placeholder="새 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {errorMessage && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>{errorMessage}</p>
        )}
        <Button onClick={handleSubmit}>확인</Button>
      </FormContainer>
    </FullPage>
  );
}

export default ResetPassword;
