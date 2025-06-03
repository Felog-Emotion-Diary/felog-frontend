import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { BetweenFlexbox, Button, Form, Input, InputFlexbox, PageMove, RowFlexbox, Title } from "../../style/signIn_Up.styles.ts";
import { overlayStore } from "../../store/signInStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";

type TSignIn = {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('옳지 않은 이메일입니다.').required('필수 입력란입니다.'),
  password: yup.string().required('필수 입력란입니다.')
})

export default function SignIn() {
  const setIsLogin = overlayStore((state) => state.setIsLogin);

  const { register, handleSubmit, formState: { errors } } = useForm<TSignIn>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onLogin: SubmitHandler<TSignIn> = (data) => {
    console.log(data)
    //axios : post 추가
    //endpoint : user/login
  }

  //이메일 저장 로직 추가 필요

  return (
    <Form onSubmit={handleSubmit(onLogin)}>
      <Title>로그인</Title>
      <InputFlexbox>
        <span>{errors.email?.message}</span>
        <Input type="text" placeholder="이메일" {...register('email')} />
        <span>{errors.password?.message}</span>
        <Input type='password' placeholder="비밀번호" {...register('password')} />
      </InputFlexbox>
      <BetweenFlexbox>
        <div role="button" style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', gap: '5px', fontSize: '1rem', cursor: 'pointer' }}>
          <MdCheckBoxOutlineBlank />
          <p>아이디 저장</p>
        </div>
        <RowFlexbox>
          <PageMove>비밀번호 찾기</PageMove>
          <PageMove type="button" onClick={setIsLogin}>회원가입</PageMove>
        </RowFlexbox>
      </BetweenFlexbox>
      <Button type='submit'>로그인</Button>
    </Form>
  )
}
