import { commentModel } from '../../models/commentModel.js';

export const createComment = {
  createComment: async (req, res) => {
    const articleId = parseInt(req.params.id);
    const { content } = req.body;
    try {
      const comment = await commentModel.createComment({ content, articleId });
      await commentModel.incrementCommentCount(articleId);
      res.status(201).json(comment);  // 성공 시 한 번만 응답을 보냄
    } catch (error) {
      console.error("Error creating board comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
