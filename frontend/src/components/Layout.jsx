import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../redux/sidebarSlice";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Header */}
      <Header />

      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => dispatch(closeSidebar())} />

        {/* Main content */}
        <main className="flex-1 px-4 py-4 transition-all duration-300 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
