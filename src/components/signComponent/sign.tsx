import OverlayComponent from "./overlay/overlay";
import { Container } from "./sign.styles";
import SignIn from "./signIn";
import SignUp from "./signUp";

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
