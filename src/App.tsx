// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CheckEmail from "./pages/CheckEmail";
// import ResetPassword from "./pages/ResetPassword";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<CheckEmail />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//       </Routes>
//     </BrowserRouter>
//   );

import './App.css'
import Router from './router/router'

function App() {
  return (
    <>
      <Router />
    </>
  )
}

export default App;
