import { Routes, Route, } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="text-center mt-10 text-xl">Home Page </div>} />
       <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<div className="text-center mt-10 text-xl">Register Page</div>} />
      <Route path="*" element={<div className="text-center mt-10 text-xl">404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
