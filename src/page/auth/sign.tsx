import OverlayComponent from "../../components/signComponent/overlay/overlay";
import { Container } from "./sign.styles";
import SignIn from "../../components/signComponent/signIn";
import SignUp from "../../components/signComponent/signUp";

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
