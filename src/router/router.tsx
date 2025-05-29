import { Route, Routes } from "react-router-dom";
import TempNavi from "../components/tempNavi/tempNavi";
import SignComponent from "../components/signComponent/sign";
import CheckEmail from "../pages/CheckEmail";
import ResetPassword from "../pages/ResetPassword";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<TempNavi />} />
      <Route path="/sign" element={<SignComponent />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
