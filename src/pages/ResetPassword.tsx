import { Button, FormContainer, FullPage, Input } from "../style/PasswordStyle";

function ResetPassword() {
  return (
    <FullPage>
      <FormContainer>
        <h1>비밀번호 재설정</h1>
        <Input type="password" placeholder="새 비밀번호" />
        <Input type="password" placeholder="비밀번호 확인" />
        <Button>확인</Button>
      </FormContainer>
    </FullPage>
  );
}

export default ResetPassword;

