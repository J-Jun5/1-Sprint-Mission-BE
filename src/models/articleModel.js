import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ArticleModel = {
  createArticle: async (data) => {
    return prisma.article.create({
      data,
    });
  },
  getArticleById: async (id) => {
    return prisma.article.findUnique({
      where: { id },
    });
  },
  updateArticle: async (id, data) => {
    return prisma.article.update({
      where: { id },
      data,
    });
  },
  deleteArticle: async (id) => {
    return prisma.article.delete({
      where: { id },
    });
  },
  getAllArticles: async () => {
    return prisma.article.findMany();
  },
};
