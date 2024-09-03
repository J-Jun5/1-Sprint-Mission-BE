import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const marketCommentCtrl = {
  // 댓글 등록 API (중고마켓)
  createMarketComment: async (req, res) => {
    const { content, articleId } = req.body;
    try {
      const article = await prisma.article.findUnique({
        where: { id: articleId },
      });

      if (!article || article.category !== 'market') {
        return res.status(400).json({ error: 'Invalid article category' });
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          articleId,
        },
      });
      res.status(201).json(comment);
    } catch (error) {
      console.error('Error creating market comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // 댓글 목록 조회 API (중고마켓)
  getMarketComments: async (req, res) => {
    const { cursor, limit = 10 } = req.query;
    try {
      const comments = await prisma.comment.findMany({
        where: { article: { category: 'market' } },
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        cursor: cursor ? { id: parseInt(cursor) } : undefined,
        skip: cursor ? 1 : 0,
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      });

      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching market comments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
