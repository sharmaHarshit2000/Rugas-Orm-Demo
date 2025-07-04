import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct } from "../redux/productSlice";
import { FaShoppingCart, FaTag, FaRupeeSign, FaImage, FaThList, FaFileAlt, FaPlusCircle } from "react-icons/fa";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const categoryOptions = [
  "Electronics",
  "Fashion",
  "Grocery",
  "Books",
  "Toys",
  "Beauty",
  "Clothing",
  "Kitchen",
  "Automotive",
  "Mobile",
  "Laptop",
  "Music",
  "Other"
];

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setFormErrors({});
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.price || formData.price <= 0) errors.price = "Enter a valid price";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val) data.append(key, val);
      });

      await dispatch(addProduct(data)).unwrap(); // if it's a thunk
      setFormData({ name: "", category: "", description: "", price: "", image: null });
      dispatch(fetchProducts());
      if (fileInputRef.current) fileInputRef.current.value = null;

      setFormErrors({});
      toast.success("Product added successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to add product");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
        <FaShoppingCart className="text-blue-600" /> Manage Products
      </h1>

    

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md mb-10 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <div className="flex items-center gap-2 mb-1 text-sm text-gray-700">
              <FaTag /> Name
            </div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="border p-2 rounded w-full"
            />
            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <div className="flex items-center gap-2 mb-1 text-sm text-gray-700">
              <FaThList /> Category
            </div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded w-full bg-white"
            >
              <option value="">Select Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
          </div>

          {/* Price */}
          <div>
            <div className="flex items-center gap-2 mb-1 text-sm text-gray-700">
              <FaRupeeSign /> Price
            </div>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              className="border p-2 rounded w-full"
            />
            {formErrors.price && <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <div className="flex items-center gap-2 mb-1 text-sm text-gray-700">
              <FaImage /> Product Image
            </div>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              ref={fileInputRef}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center gap-2 mb-1 text-sm text-gray-700">
            <FaFileAlt /> Description
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="border p-2 rounded w-full resize-none"
          />
          {formErrors.description && (
            <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2"
        >
          <FaPlusCircle /> Add Product
        </button>
      </form>

      {/* Products Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full min-w-[600px] table-auto border-collapse">
            <thead className="bg-gray-100 text-left">
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
                <tr key={p._id} className="text-sm">
                  <td className="border px-4 py-2 text-center">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-12 w-12 object-cover mx-auto rounded"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">{p.name}</td>
                  <td className="border px-4 py-2">{p.category}</td>
                  <td className="border px-4 py-2 font-medium text-green-700">₹{p.price}</td>
                  <td className="border px-4 py-2 text-gray-700 max-w-xs truncate" title={p.description}>
                    {p.description}
                  </td>
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
