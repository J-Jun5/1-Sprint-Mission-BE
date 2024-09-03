import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const articleModel = {
  // 특정 카테고리의 게시글 목록 조회
  getAllComments: async ({ articleId, cursor, limit, sort }) => {
    return await prisma.comment.findMany({
      where: { articleId: articleId }, // 단순히 값으로 비교
      orderBy: { createdAt: sort },  // 정렬 기준
      take: parseInt(limit),  // 가져올 댓글 수
      skip: cursor ? 1 : 0,  // 커서를 스킵할지 여부
      cursor: cursor ? { id: parseInt(cursor) } : undefined,  // 커서 위치
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });
  },

  // 게시글 상세 조회
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
