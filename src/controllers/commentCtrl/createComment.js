import { commentModel } from "../../models/commentModel.js";

export const createComment = {
  // 댓글 등록 API (자유게시판)
  createComment: async (req, res) => {
    const { content, articleId } = req.body;
    try {
      const comment = await commentModel.createComment({ content, articleId });
      res.status(201).json(comment);

      try {
        await commentModel.incrementCommentCount(articleId);
      } catch (error) {
        console.error("Error Incrementing comment count :", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error("Error creating board comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};