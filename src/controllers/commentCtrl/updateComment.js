import { commentModel } from '../../models/commentModel.js';

export const updateComment = {
  // 댓글 수정 API
  updateComment: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const comment = await commentModel.updateComment(id, content);
      res.status(200).json(comment);
    } catch (error) {
      console.error('Error updating comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
