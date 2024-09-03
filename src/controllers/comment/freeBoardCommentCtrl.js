import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const FreeBoardCommentCtrl = {
  // 댓글 등록 API (자유게시판)
  createBoardComment: async (req, res) => {
    const { content, articleId } = req.body;
    try {
      const article = await prisma.article.findUnique({
        where: { id: articleId },
      });

      if (!article || article.category !== 'board') {
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
      console.error('Error creating board comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  // 댓글 목록 조회 API (자유게시판)
  getBoardComments: async (req, res) => {
    const { cursor, limit = 10 } = req.query;
    try {
      const comments = await prisma.comment.findMany({
        where: { article: { category: 'board' } },
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
      console.error('Error fetching board comments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
