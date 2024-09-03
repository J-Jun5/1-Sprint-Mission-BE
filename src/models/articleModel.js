import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const articleModel = {
  // 특정 카테고리의 게시글 목록 조회
  getAllArticles: async (category, orderBy, offset, limit) => {
    return await prisma.article.findMany({
      where: { category },
      orderBy: orderBy,
      skip: parseInt(offset), // 건너뛸 DATA 갯수
      take: parseInt(limit), // offset 기준으로 가져올 DATA 갯수
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });
  },

  // 게시글 조회
  getArticleById: async (id) => {
    return await prisma.article.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  //게시물 생성
  createArticle: async (data) => {
    return await prisma.article.create({
      data,
    });
  },

  // 게시글 수정
  updateArticle: async (id, data) => {
    return await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        updatedAt: new Date(), // 명시적으로 updatedAt 갱신
      },
    });
  },

  // 게시글 삭제
  deleteArticle: async (id) => {
    return await prisma.article.delete({
      where: { id: parseInt(id) },
    });
  },
};
