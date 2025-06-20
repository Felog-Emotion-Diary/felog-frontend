import OverlayComponent from "../components/overlayComponent/overlay";
import { Container } from "../style/sign.styles";
import SignIn from "../components/signComponent/signIn";
import SignUp from "../components/signComponent/signUp";

export default function SignComponent() {
  return (
    <>
      <Container>
        <SignIn />
        <SignUp />
        <OverlayComponent />
      </Container>
    </>
  )
}
