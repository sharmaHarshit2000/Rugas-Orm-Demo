import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct } from "../redux/productSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setFormErrors({}); // clear errors on change
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.price || formData.price <= 0) errors.price = "Enter a valid price";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(addProduct(formData));
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      imageUrl: "",
    });
    setFormErrors({});
    setSuccessMsg("Product added successfully!");

    // Remove success message after 3 seconds
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Products</h1>

      {/* Form Success */}
      {successMsg && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 border border-green-300">
          {successMsg}
        </div>
      )}

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="border p-2 rounded w-full"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
          <div>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border p-2 rounded w-full"
            />
            {formErrors.category && <p className="text-red-500 text-sm">{formErrors.category}</p>}
          </div>
          <div>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              className="border p-2 rounded w-full"
            />
            {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}
          </div>
          <div>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
          {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>

      {/* Products Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="text-center">
                  <td className="border px-4 py-2">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="h-12 w-12 object-cover mx-auto" />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">{p.name}</td>
                  <td className="border px-4 py-2">{p.category}</td>
                  <td className="border px-4 py-2">₹{p.price}</td>
                  <td className="border px-4 py-2 text-left">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
