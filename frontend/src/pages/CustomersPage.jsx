import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, addCustomer } from "../redux/customerSlice";

const CustomersPage = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCustomer(formData));
    setFormData({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Customers</h1>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4 max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border p-2 rounded" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="border p-2 rounded" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="border p-2 rounded" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="border p-2 rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Customer</button>
      </form>

      {/* Customer Table */}
      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Phone</th>
                <th className="border px-3 py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td className="border px-3 py-2">{customer.name}</td>
                  <td className="border px-3 py-2">{customer.email}</td>
                  <td className="border px-3 py-2">{customer.phone}</td>
                  <td className="border px-3 py-2">{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
