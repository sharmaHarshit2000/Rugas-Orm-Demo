import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth?.user?.email) || "Logged In";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b shadow flex items-center justify-between px-4 md:px-6">
     
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="text-blue-700 text-2xl"
        >
          <FaBars />
        </button>

        <h1 className="text-lg md:text-xl font-bold text-blue-700 whitespace-nowrap">
          RUGAS <span className="hidden sm:inline">| Order Management</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[120px] sm:max-w-none">
          {userEmail}
        </span>
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
