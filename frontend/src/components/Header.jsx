import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b shadow flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="text-blue-700 text-2xl"
        >
          <FaBars />
        </button>

        {/* Brand name */}
        <h1 className="text-lg md:text-xl font-bold text-blue-700 whitespace-nowrap">
          RUGAS <span className="hidden sm:inline">| Order Management</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* If logged in */}
        {user ? (
          <>
            <div className="flex items-center gap-2 text-sm text-gray-700 max-w-[150px] truncate">
              <FaUserCircle className="text-blue-700" />
              <span className="truncate">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          // If not logged in
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
          >
            <FaSignInAlt />
            <span className="hidden sm:inline">Login</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
