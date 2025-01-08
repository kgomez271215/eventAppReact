import { Route, Routes } from "react-router-dom";
import Onboarding from "../pages/Onboarding";
import Login from "../pages/Login";
import Main from "../pages/Main";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Onboarding onFinish={() => (window.location.href = "/login")} />} />
    <Route path="/login" element={<Login />} />
    <Route path="/main" element={<Main />} />
  </Routes>
);

export default AppRoutes;
