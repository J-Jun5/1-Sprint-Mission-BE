import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const articleModel = {
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

  // 특정 카테고리의 게시글 목록 조회
  getAllArticlesByCategory: async (category, { page, limit, sort, search }) => {
    const offset = (page - 1) * limit; // 페이지네이션 계산
    const orderBy = sort === "recent" ? { createdAt: "desc" } : {}; // 정렬 기준

    // 검색 조건 설정
    const where = {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive", // 대소문자 구분 X
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive", // 대소문자 구분 X
          },
        },
      ],
      category: category,
    };

    const articles = await prisma.article.findMany({
      where,
      orderBy,
      skip: parseInt(offset), // 건너뛸 DATA 갯수
      take: parseInt(limit), // offset 기준으로 가져올 DATA 갯수
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    // 총 게시글 수 조회 (페이지네이션 용)
    const totalArticles = await prisma.article.count({ where });

    return {
      data: articles,
      pagination: {
        total: totalArticles,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    };
  },
};
