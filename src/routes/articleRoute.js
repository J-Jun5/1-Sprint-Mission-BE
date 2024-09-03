import express from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/articleCtrl/index.js";

const router = express.Router();
// 게시물 전체 조회
router.get("/articles", getAllArticles.getAllArticles);

// 게시물 등록
router.post("/article", createArticle.createArticle);

// 게시물 상세 조회
router.get("/article/:id", getArticleById.getArticleById);

// 게시물 수정
router.put("/article/:id", updateArticle.updateArticle);

// 게시물 삭제
router.delete("/article/:id", deleteArticle.deleteArticle);

export default router;
