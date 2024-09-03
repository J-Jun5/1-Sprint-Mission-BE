import express from 'express';
import { commonCommentCtrl, freeBoardCommentCtrl, marketCommentCtrl } from '../controllers/comment';

const router = express.Router();

// 댓글 목록 조회 API
router.get('/market/comments', marketCommentCtrl.getAllComments);
router.get('/freeboard/comments', freeBoardCommentCtrl.getAllComments);

// 댓글 등록 API
router.post('/market/comments', marketCommentCtrl.createComment);
router.post('/freeboard/comments', freeBoardCommentCtrl.createComment);

// 댓글 수정 API
router.patch('/comments/:id', commonCommentCtrl.updateComment);

// 댓글 삭제 API
router.delete('/comments/:id', commonCommentCtrl.deleteComment);

export default router;