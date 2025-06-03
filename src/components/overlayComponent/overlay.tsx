import { Button, ImageContainer, Overlay } from "../../style/overlay.styles";
import Logo from '../../assets/Logo.png'
import { overlayStore } from "../../store/signInStore";

export default function OverlayComponent() {
  const islogin = overlayStore((state) => state.isLogin);
  return (
    <Overlay $islogin={islogin}>
      <ImageContainer>
        <img src={Logo} />
      </ImageContainer>
      <p>Felog</p>
      <span>바쁜 하루 속 놓치기 쉬운 내 감정</span>
      <span>오늘의 나를 잊지 않도록,</span>
      <span>오늘의 나를 기록해보세요.</span>
      <span>기록은 나에게 줄 수 있는</span>
      <span>가장 친절한 선물이에요.</span>
      <Button>더 알아보기</Button>
    </Overlay>
  )
}
