import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, addCustomer } from "../redux/customerSlice";
import { FaUserPlus, FaUsers } from "react-icons/fa";

const CustomersPage = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setFormErrors({});
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email is required";
    if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone must be 10 digits";
    if (formData.address.trim().length < 5) errors.address = "Address must be at least 5 characters";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const res = await dispatch(addCustomer(formData));
    if (res.meta.requestStatus === "fulfilled") {
      setSuccessMsg("Customer added successfully!");
      setFormData({ name: "", email: "", phone: "", address: "" });
      setTimeout(() => setSuccessMsg(""), 3000);
    } else {
      setFormErrors({ submit: res.payload || "Something went wrong" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
        <FaUsers /> Customers
      </h1>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 space-y-4 max-w-3xl">
        {successMsg && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded border border-green-300">
            {successMsg}
          </div>
        )}

        {formErrors.submit && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300">
            {formErrors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-2 rounded w-full"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="border p-2 rounded w-full"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 rounded w-full"
            />
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
          </div>
          <div>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-2 rounded w-full"
            />
            {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2"
        >
          <FaUserPlus /> Add Customer
        </button>
      </form>

      {/* Customer Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full table-auto border-collapse min-w-[600px]">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td className="border px-4 py-2">{customer.name}</td>
                  <td className="border px-4 py-2">{customer.email}</td>
                  <td className="border px-4 py-2">{customer.phone}</td>
                  <td className="border px-4 py-2">{customer.address}</td>
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
