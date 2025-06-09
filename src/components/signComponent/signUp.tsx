import { useForm, type SubmitHandler } from "react-hook-form";
import { overlayStore } from "../../store/signInStore";
import { BetweenFlexbox, Button, Form, Input, InputFlexbox, PageMove, Title } from "../../style/signIn_Up.styles.ts";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { axiosInstance } from "../../utils/axiosInstance.tsx";
import axios from "axios";
import { AuthStore } from "../../store/authStore.ts";

interface IInstanceError {
  message: string;
  response?: {
    status: number;
  };
}

type TSignUp = {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
}

const schema = yup.object({
  email: yup.string().email('옳지 않은 이메일입니다.').required('필수 입력란입니다.'),
  nickname: yup.string().required('필수 입력란입니다.'),
  password: yup.string().required('필수 입력란입니다.'),
  checkPassword: yup.string().oneOf([yup.ref('password')], '비밀번호가 다릅니다').required('필수 입력란입니다.'),
})

export default function SignUp() {
  const setIsLogin = overlayStore((state) => state.setIsLogin);

  const { register, handleSubmit, formState: { errors } } = useForm<TSignUp>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSignUp: SubmitHandler<TSignUp> = async (data) => {
    const { checkPassword, ...submitData } = data;
    const { nickname, ...loginData } = submitData;
    try {
      const signUpresponse = await axiosInstance.post('api/users/register', submitData)
      console.log('회원가입 성공');
      console.log(signUpresponse);

      const signInResponse = await axiosInstance.post('/api/users/login', loginData);
      console.log('로그인 성공')
      console.log(signInResponse);

      const token = signInResponse.data.token;
      AuthStore.getState().setToken(token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 409) {
          alert('이미 존재하는 이메일입니다.');
        } else if (status === 400) {
          alert('모든 입력란을 작성해주세요.');
        }
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSignUp)}>
      <Title>회원가입</Title>
      <InputFlexbox>
        <span>{errors.email?.message}</span>
        <Input type="text" placeholder="이메일" {...register('email')} />
        <span>{errors.nickname?.message}</span>
        <Input type='text' placeholder="닉네임" {...register('nickname')} />
        <span>{errors.password?.message}</span>
        <Input type='password' placeholder="비밀번호" {...register('password')} />
        <span>{errors.checkPassword?.message}</span>
        <Input type='password' placeholder="비밀번호 확인" {...register('checkPassword')} />
      </InputFlexbox>
      <BetweenFlexbox>
        <PageMove type="button" style={{ padding: '10px 0 0 20px' }} onClick={setIsLogin}>이미 계정이 있습니다.</PageMove>
      </BetweenFlexbox>
      <Button>회원가입</Button>
    </Form>
  )
}
