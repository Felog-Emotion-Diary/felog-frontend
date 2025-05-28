import { Button, FormContainer, FullPage, Input } from "../style/PasswordStyle";
import { useNavigate } from "react-router-dom";

function CheckEmail() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reset-password");
  }

  return (
    <FullPage>
      <FormContainer>
        <h1>재설정 메일 확인</h1>
        <Input type="email" placeholder="이메일" />
        <Button onClick={handleClick}>확인</Button>
      </FormContainer>
    </FullPage>
  );
}

export default CheckEmail;

