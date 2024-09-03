import { articleModel } from "../../models/articleModel.js";

export const createArticle = {
  // 게시물 수정 API
  createArticle: async (req, res) => {
    const { title, content, category } = req.body;

    try {
      const newArticle = await articleModel.createArticle({
        title,
        content,
        category,
      });

      res.status(201).json(newArticle);
    } catch (error) {
      console.error("Error creating article:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
