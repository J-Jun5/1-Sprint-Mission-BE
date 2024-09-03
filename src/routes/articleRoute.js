import express from "express";
import { freeBoardArticleCtrl, marketArticleCtrl, commonArticleCtrl } from "../controllers/article/index.js";

const router = express.Router();
// 게시물 전체 조회
router.get("/market/articles", freeBoardArticleCtrl.getAllArticles);
router.get("/freeboard/articles", marketArticleCtrl.getAllArticles);

// 게시물 등록
router.post("/article", commonArticleCtrl.createArticle);

// 게시물 상세 조회
router.get("/article/:id", commonArticleCtrl.getArticleById);

// 게시물 수정
router.put("/article/:id", commonArticleCtrl.updateArticle);

// 게시물 삭제
router.delete("/article/:id", commonArticleCtrl.deleteArticle);

export default router;
