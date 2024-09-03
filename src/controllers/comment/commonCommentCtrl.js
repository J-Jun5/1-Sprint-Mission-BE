import { commentModel } from '../models/commentModel';

export const commonCommentCtrl = {
  // 댓글 수정 API
  updateComment: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const comment = await commentModel.updateComment(parseInt(id), content);
      res.status(200).json(comment);
    } catch (error) {
      console.error('Error updating comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // 댓글 삭제 API
  deleteComment: async (req, res) => {
    const { id } = req.params;
    try {
      await commentModel.deleteComment(parseInt(id));
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
