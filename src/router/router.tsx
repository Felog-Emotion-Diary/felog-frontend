import { Route, Routes } from "react-router-dom";
import TempNavi from "../components/tempNavi/tempNavi";
import SignComponent from "../page/auth/sign";
import DiaryWrite from "../page/diaryWrite/diaryWrite";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<TempNavi />} />
      <Route path='/sign' element={<SignComponent />} />
      <Route path="/diaries/write" element={<DiaryWrite />} />
    </Routes>
  )
}
