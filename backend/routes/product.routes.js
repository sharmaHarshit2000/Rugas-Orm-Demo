import express from "express";
import { createProduct, getAllProducts } from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);

export default router;
