import { articleModel } from '../../models/articleModel.js';

export const updateArticle = {
  // 게시물 수정 API
  updateArticle: async (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;

    try {
      const updatedArticle = await articleModel.updateArticle(id, { title, content, category });
      res.status(200).json(updatedArticle);
    } catch (error) {
      console.error('Error updating article:', error);
      if (error.code === 'P2025') { // Prisma specific error for not found record
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },
};
