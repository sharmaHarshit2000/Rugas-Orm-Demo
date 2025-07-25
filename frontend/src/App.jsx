import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { loadUserFromToken } from "./redux/authSlice";
import { useEffect } from "react";
import  { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUserFromToken());
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
};

export default App;