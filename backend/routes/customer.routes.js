import express from "express";
import { createCustomer, getAllCustomers } from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", createCustomer);
router.get("/", getAllCustomers);

export default router;
