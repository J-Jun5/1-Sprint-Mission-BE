import { commentModel } from '../models/commentModel';

export const freeBoardCommentCtrl = {
  // 댓글 등록 API (자유게시판)
  createComment: async (req, res) => {
    const { content, articleId } = req.body;
    try {
      const article = await commentModel.getArticleById(articleId);

      if (!article || article.category !== 'board') {
        return res.status(400).json({ error: 'Invalid article category' });
      }

      const comment = await commentModel.createComment(content, articleId);
      res.status(201).json(comment);
    } catch (error) {
      console.error('Error creating board comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // 댓글 목록 조회 API (자유게시판)
  getAllComments: async (req, res) => {
    const { cursor, limit = 10 } = req.query;
    try {
      const comments = await commentModel.getCommentsByCategory('board', { cursor, limit });
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching board comments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
