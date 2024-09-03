import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const commentModel = {
  // 특정 게시물의 댓글 목록 조회
  getAllCommentsByArticleId: async (articleId, orderBy, cursor, limit ) => {
    return await prisma.comment.findMany({
      where: { articleId: parseInt(articleId) },
      orderBy,
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

  getTotalCommentCount: async (articleId) => {
    return await prisma.comment.count({
      where: { articleId: articleId },
    });
  },


  // 댓글 생성
  createComment: async (data) => {
    return await prisma.comment.create({
      data: {
        ...data,
        createdAt: new Date(),
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

};
