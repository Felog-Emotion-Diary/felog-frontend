import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckEmail from "./pages/CheckEmail";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
