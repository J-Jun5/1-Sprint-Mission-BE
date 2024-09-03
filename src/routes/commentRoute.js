import express from 'express';
import { createComment, getAllComments, updateComment, deleteComment } from '../controllers/commentCtrl/index.js';
const router = express.Router();

// 댓글 목록 조회 API
router.get('/article/:id/comments', getAllComments.getAllComments);

// 댓글 등록 API
router.post('/article/:id', createComment.createComment);

// 댓글 수정 API
router.patch('/comments/:id', updateComment.updateComment);

// 댓글 삭제 API 
router.delete('/article/:id', deleteComment.deleteComment);

export default router;