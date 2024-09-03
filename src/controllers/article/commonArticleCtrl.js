import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const articleCtrl = {
  // 게시물 수정 API
  updateArticle: async (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;

    try {
      const updatedArticle = await prisma.article.update({
        where: { id: parseInt(id) },
        data: {
          title,
          content,
          category,
          updatedAt: new Date(), // 명시적으로 updatedAt 갱신
        },
      });

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

  // 게시물 삭제 API
  deleteArticle: async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.article.delete({
        where: { id: parseInt(id) },
      });

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
