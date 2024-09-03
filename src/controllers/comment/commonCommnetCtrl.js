import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CommonCommentCtrl = {
  // 댓글 수정 API
  updateComment: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const comment = await prisma.comment.update({
        where: { id: parseInt(id) },
        data: { content },
      });
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
      await prisma.comment.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
