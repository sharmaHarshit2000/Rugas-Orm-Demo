import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to Rugas Dashboard
        </h1>
        <p className="mb-6 text-gray-700">
          This is your dashboard. Use the navigation to manage orders, products, and customers.
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
