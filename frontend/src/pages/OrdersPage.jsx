import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../redux/orderSlice";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const [statusFilter, setStatusFilter] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter ? order.status === statusFilter : true;
    const matchCustomer = order.customer?.name?.toLowerCase().includes(searchCustomer.toLowerCase());
    const matchCategory = order.product?.category?.toLowerCase().includes(searchCategory.toLowerCase());
    return matchStatus && matchCustomer && matchCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🛒 Orders</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="placed">Placed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="text"
          placeholder="Search Customer"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Search Category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Orders List */}
      {loading ? (
        <p className="text-center text-blue-600 font-medium">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No matching orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {order.product?.name || "Unnamed Product"}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                📦 <span className="font-medium">Category:</span> {order.product?.category}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                👤 <span className="font-medium">Customer:</span> {order.customer?.name}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                💰 <span className="font-medium">Price:</span> ₹{order.product?.price}
              </p>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`text-sm p-1 px-2 rounded bg-gray-100 border focus:outline-none focus:ring-2 ${
                    order.status === "cancelled"
                      ? "text-red-600"
                      : order.status === "delivered"
                      ? "text-green-600"
                      : order.status === "shipped"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  <option value="placed">Placed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
