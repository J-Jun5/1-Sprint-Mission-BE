import { articleModel } from '../../models/articleModel.js';

export const deleteArticle = {

  // 게시물 삭제 API
  deleteArticle: async (req, res) => {
    const { id } = req.params;

    try {
      await articleModel.deleteArticle(id);
      res.status(204).send(); // No Content
    } catch (error) {
      console.error('Error deleting article:', error);
      if (error.code === 'P2025') { // Prisma specific error for not found record
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },
};
