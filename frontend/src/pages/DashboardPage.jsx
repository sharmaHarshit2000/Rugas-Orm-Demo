import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/orderSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaShoppingCart } from "react-icons/fa";

const statusColors = {
  placed: "#6366F1",     
  shipped: "#10B981",    
  delivered: "#F59E0B",  
  cancelled: "#EF4444",  
};

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const stats = {
    total: orders.length,
    placed: orders.filter((o) => o.status === "placed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const chartData = [
    { name: "Placed", value: stats.placed },
    { name: "Shipped", value: stats.shipped },
    { name: "Delivered", value: stats.delivered },
    { name: "Cancelled", value: stats.cancelled },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">📊 Order Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        <StatCard label="Total" value={stats.total} color="bg-blue-500" />
        <StatCard label="Placed" value={stats.placed} color="bg-indigo-500" />
        <StatCard label="Shipped" value={stats.shipped} color="bg-green-500" />
        <StatCard label="Delivered" value={stats.delivered} color="bg-yellow-500" />
        <StatCard label="Cancelled" value={stats.cancelled} color="bg-red-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Orders by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(statusColors)[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Orders Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(statusColors)[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className={`rounded-xl shadow-md p-4 text-white ${color}`}>
    <div className="flex items-center gap-3">
      <div className="bg-white/20 rounded-full p-2">
        <FaShoppingCart size={20} />
      </div>
      <div>
        <p className="uppercase text-sm">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

export default DashboardPage;
