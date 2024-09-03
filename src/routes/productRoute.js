import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productCtrl/index.js";

const router = express.Router();

// 상품 전체 조회, 상세조회
router.get("/products", getAllProducts.getAllProducts);
router.get("/product/:id", getProductById.getProductById);

// 상품 등록
router.post("/product", createProduct.createProduct);

// 상품 정보 수정
router.put("/product/:id", updateProduct.updateProduct);

// 상품 정보 삭제
router.delete("/product/:id", deleteProduct.deleteProduct);


export default router;
