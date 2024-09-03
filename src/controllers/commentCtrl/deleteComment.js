import { commentModel } from '../../models/commentModel.js';

export const deleteComment = {
  // 댓글 삭제 API
  deleteComment: async (req, res) => {
    const articleId = parseInt(req.params.id);
    const { id } = req.body;
    try {
      await commentModel.deleteComment(id);
      await commentModel.decrementCommentCount(articleId);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
