import { Route, Routes } from "react-router-dom";
import TempNavi from "../components/tempNavi/tempNavi";
import SignComponent from "../components/signComponent/sign";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<TempNavi />} />
      <Route path='/sign' element={<SignComponent />} />
    </Routes>
  )
}
