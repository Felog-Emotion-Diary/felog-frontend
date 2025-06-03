import { Route, Routes } from "react-router-dom";
import SignComponent from "../pages/sign";
import CheckEmail from "../pages/CheckEmail";
import ResetPassword from "../pages/ResetPassword";
import MainPage from "../pages/MainPage";
import Layout from "../components/layout/Layout";
import DiaryWrite from "../pages/diaryWritePage";

export default function Router() {
  return (
    <Routes>
      <Route path="/diaries/write" element={<DiaryWrite />} />
      <Route path="/sign" element={<SignComponent />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<Layout />}>
        <Route path="/main" element={<MainPage />} />
      </Route>
    </Routes>
  );
}
