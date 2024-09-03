import { articleModel } from '../models/articleModel';

export const marketArticleCtrl = {
  getAllArticles: async (req, res) => {
    try {
      const { page = 1, limit = 10, sort = "recent", search = "" } = req.query;
      const articles = await articleModel.getAllArticlesByCategory('market', { page, limit, sort, search });
      res.status(200).json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
