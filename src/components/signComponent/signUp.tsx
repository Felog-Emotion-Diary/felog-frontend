import { overlayStore } from "../../store/signInStore";
import { BetweenFlexbox, Button, Form, Input, InputFlexbox, PageMove, Title } from "./signIn_Up.styles";

export default function SignUp() {
  const setIsLogin = overlayStore((state) => state.setIsLogin);
  return (
    <Form>
      <Title>회원가입</Title>
      <InputFlexbox>
        <Input type="text" placeholder="이메일" />
        <Input type='text' placeholder="닉네임" />
        <Input type='password' placeholder="비밀번호" />
        <Input type='password' placeholder="비밀번호 확인" />
      </InputFlexbox>
      <BetweenFlexbox>
        <PageMove type="button" style={{ padding: '10px 0 0 20px' }} onClick={setIsLogin}>이미 계정이 있습니다.</PageMove>
      </BetweenFlexbox>
      <Button>회원가입</Button>
    </Form>
  )
}
