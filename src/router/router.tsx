import { Route, Routes } from "react-router-dom";
import SignComponent from "../pages/sign";
import CheckEmail from "../pages/CheckEmail";
import ResetPassword from "../pages/ResetPassword";
import MainPage from "../pages/MainPage";
import Layout from "../components/layout/Layout";
import DiaryWrite from "../pages/diaryWritePage";
import EmotionStats from "../pages/EmotionStats";
import DiaryListPage from "../pages/diaryListPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/write" element={<DiaryWrite />} />
      <Route path="/sign" element={<SignComponent />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<Layout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/emotion-stats" element={<EmotionStats />} />
        <Route path="/list" element={<DiaryListPage />} />
      </Route>
    </Routes>
  );
}
