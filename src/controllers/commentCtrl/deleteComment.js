import { commentModel } from '../../models/commentModel.js';

export const deleteComment = {
  // 댓글 삭제 API
  deleteComment: async (req, res) => {
    const { id } = req.params;
    try {
      await commentModel.deleteComment(id);
      res.status(204).send();

      try {
        await commentModel.decrementCommentCount(articleId);
      } catch (error) {
        console.error("Error decrementing comment count :", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
