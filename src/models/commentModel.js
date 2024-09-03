import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const commentModel = {
  // 특정 게시물의 댓글 목록 조회
  getAllComments: async ({ articleId, cursor, limit, sort }) => {
    return await prisma.comment.findMany({
      where: { articleId: articleId }, // 단순히 값으로 비교
      orderBy: { createdAt: sort }, // 정렬 기준
      take: parseInt(limit), // 가져올 댓글 수
      skip: cursor ? 1 : 0, // 커서를 스킵할지 여부
      cursor: cursor ? { id: parseInt(cursor) } : undefined, // 커서 위치
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
  createComment: async ({ content, articleId }) => {
    return await prisma.comment.create({
      data: {
        content: content, // 댓글 내용
        articleId: articleId, // 게시물 ID
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

  incrementCommentCount: async (articleId) => {
    return await prisma.article.update({
      where: { id: articleId },
      data: {
        commentcount: { increment: 1 },
      },
    });
  },

  decrementCommentCount: async (articleId) => {
    return await prisma.article.update({
      where: { id: articleId },
      data: {
        commentcount: { decrement: 1 },
      },
    });
  },
};
