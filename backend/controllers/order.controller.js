import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";

export const createOrder = async (req, res) => {
  try {
    const { customer, product } = req.body;

    const foundCustomer = await Customer.findById(customer);
    const foundProduct = await Product.findById(product);
    if (!foundCustomer || !foundProduct) {
      return res.status(400).json({ message: "Invalid customer or product" });
    }

    const newOrder = await Order.create({ customer, product });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { status, customer, category } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (customer) filter.customer = customer;

    const orders = await Order.find(filter)
      .populate("customer", "name email")
      .populate("product");

     const filtered = category
      ? orders.filter((o) => o.product?.category === category)
      : orders;

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate("customer")
      .populate("product");

    if (!updated) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};
