
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
