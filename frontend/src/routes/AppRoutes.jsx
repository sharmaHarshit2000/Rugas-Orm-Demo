import { Routes, Route, } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="text-center mt-10 text-xl">Home Page </div>} />
      <Route path="/login" element={<div className="text-center mt-10 text-xl">Login Page</div>} />
      <Route path="/register" element={<div className="text-center mt-10 text-xl">Register Page</div>} />
      <Route path="*" element={<div className="text-center mt-10 text-xl">404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
