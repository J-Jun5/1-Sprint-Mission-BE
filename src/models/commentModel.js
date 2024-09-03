import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const commentModel = {
  // 특정 카테고리의 댓글 목록 조회
  getCommentsByCategory: async (category, { cursor, limit }) => {
    return await prisma.comment.findMany({
      where: { article: { category } },
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
      cursor: cursor ? { id: parseInt(cursor) } : undefined,
      skip: cursor ? 1 : 0,
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });
  },

  // 댓글 생성
  createComment: async (content, articleId) => {
    return await prisma.comment.create({
      data: {
        content,
        articleId,
      },
    });
  },

  // 댓글 수정
  updateComment: async (id, content) => {
    return await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { content },
    });
  },

  // 댓글 삭제
  deleteComment: async (id) => {
    return await prisma.comment.delete({
      where: { id: parseInt(id) },
    });
  },

  // 특정 게시글의 카테고리 확인
  getArticleById: async (articleId) => {
    return await prisma.article.findUnique({
      where: { id: parseInt(articleId) },
    });
  },
};
