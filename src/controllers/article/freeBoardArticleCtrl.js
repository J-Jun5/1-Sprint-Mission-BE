import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const FreeboardArticleCtrl = {
  getFreeboardAllArticles: async (req, res) => {
    try {
      const { page = 1, limit = 10, sort = "recent", search = "" } = req.query;
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
      };

      // 게시글 목록 조회
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

      res.status(200).json({
        data: articles,
        pagination: {
          total: totalArticles,
          page: parseInt(page),
          limit: parseInt(limit),
        },
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
