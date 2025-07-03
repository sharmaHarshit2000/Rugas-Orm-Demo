import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoute from "../components/PrivateRoute";
import CustomersPage from "../pages/CustomersPage";
import ProductsPage from "../pages/ProductsPage";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/products" element={<ProductsPage />} />


            </Route>

            {/* 404 */}
            <Route path="*" element={<div className="text-center mt-10 text-xl">404 Not Found</div>} />
        </Routes>
    );
};

export default AppRoutes;
