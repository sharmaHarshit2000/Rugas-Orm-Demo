import { Routes, Route, } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="text-center mt-10 text-xl">Home Page </div>} />
       <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<div className="text-center mt-10 text-xl">404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
