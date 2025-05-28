import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { BetweenFlexbox, Button, Form, Input, InputFlexbox, PageMove, RowFlexbox, Title } from "./signIn_Up.styles";
import { overlayStore } from "../../store/signInStore";

export default function SignIn() {
  const setIsLogin = overlayStore((state) => state.setIsLogin);

  return (
    <Form>
      <Title>로그인</Title>
      <InputFlexbox>
        <Input type="text" placeholder="이메일" />
        <Input type='password' placeholder="비밀번호" />
      </InputFlexbox>
      <BetweenFlexbox>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MdCheckBoxOutlineBlank />
          <p>아이디 저장</p>
        </div>
        <RowFlexbox>
          <PageMove>비밀번호 찾기</PageMove>
          <PageMove type="button" onClick={setIsLogin}>회원가입</PageMove>
        </RowFlexbox>
      </BetweenFlexbox>
      <Button>로그인</Button>
    </Form>
  )
}
