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
      <h1 className="text-3xl font-bold text-blue-700 mb-6">📋 Orders List</h1>

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

      {/* Orders Table */}
      {loading ? (
        <p className="text-center text-blue-600 font-medium">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No matching orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-4 rounded shadow">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Price (₹)</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{order.product?.name || "Unnamed"}</td>
                  <td className="border px-4 py-2">{order.product?.category || "-"}</td>
                  <td className="border px-4 py-2">{order.customer?.name || "-"}</td>
                  <td className="border px-4 py-2">₹{order.product?.price}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-sm p-1 px-2 rounded border w-full bg-gray-50 focus:outline-none focus:ring-2 ${
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
