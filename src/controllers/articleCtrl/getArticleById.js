import { articleModel } from '../../models/articleModel.js';

export const getArticleById = {

  // 게시물 상세 조회 API
  getArticleById: async (req, res) => {
    const { id } = req.params;

    try {
      const article = await articleModel.getArticleById(id);
      
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      res.status(200).json(article);
    } catch (error) {
      console.error('Error fetching article:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
