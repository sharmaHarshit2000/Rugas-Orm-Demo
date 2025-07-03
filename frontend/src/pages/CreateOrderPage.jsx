import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../redux/customerSlice";
import { fetchProducts } from "../redux/productSlice";
import { createOrder } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";

const CreateOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { customers } = useSelector((state) => state.customers);
    const { products } = useSelector((state) => state.products);
    const { loading } = useSelector((state) => state.orders);

    const [formData, setFormData] = useState({
        customerId: "",
        productId: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        dispatch(fetchCustomers());
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.customerId || !formData.productId) {
            setError("Please select both customer and product");
            return;
        }

        try {
            await dispatch(createOrder({
                customer: formData.customerId,
                product: formData.productId
            })).unwrap();
            navigate("/orders");
        } catch (err) {
            setError("Failed to create order. Try again.");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Create Order</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Customer Select */}
                <div>
                    <label className="block text-sm font-medium mb-1">Select Customer</label>
                    <select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        className="border w-full p-2 rounded"
                    >
                        <option value="">-- Choose Customer --</option>
                        {customers.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name} ({c.email})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Product Select */}
                <div>
                    <label className="block text-sm font-medium mb-1">Select Product</label>
                    <select
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        className="border w-full p-2 rounded"
                    >
                        <option value="">-- Choose Product --</option>
                        {products.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.name} - ₹{p.price}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Place Order"}
                </button>
            </form>
        </div>
    );
};

export default CreateOrderPage;
