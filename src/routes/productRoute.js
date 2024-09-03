import express from "express";
import { getProductCtrl, etcProductCtrl } from "../controllers/productCtrl/index.js";

const router = express.Router();

// 상품 전체 조회, 상세조회
router.get("/products", getProductCtrl.getAllProducts);
router.get("/product/:id", getProductCtrl.getProductById);

// 상품 등록
router.post("/product", etcProductCtrl.createProduct);

// 상품 정보 수정
router.put("/product/:id", etcProductCtrl.updateProduct);

// 상품 정보 삭제
router.delete("/product/:id", etcProductCtrl.deleteProduct);


export default router;
