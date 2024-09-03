import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productCtrl = {
  // 전체 상품 조회 API
  getProducts: async (req, res) => {
    try {
      const { page = 1, limit = 10, sort = 'recent', search = '' } = req.query;

      // 페이지네이션 계산
      const offset = (page - 1) * limit;

      // 정렬 기준 설정
      let orderBy;
      if (sort === 'recent') {
        orderBy = { createdAt: 'desc' };
      } else if (sort === 'price_asc') {
        orderBy = { price: 'asc' };
      } else if (sort === 'price_desc') {
        orderBy = { price: 'desc' };
      } else {
        orderBy = { createdAt: 'desc' }; // 기본값
      }

      // 검색 조건 설정
      const where = {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive', // 대소문자 구분 없이 검색
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      };

      // 상품 목록 조회
      const products = await prisma.product.findMany({
        where,
        orderBy,
        skip: parseInt(offset),
        take: parseInt(limit),
        select: {
          id: true,
          img: true,
          name: true,
          description: true,
          price: true,
          like: true,
          tags: true,
          createdAt: true,
        },
      });

      // 총 상품 수 조회 (페이지네이션 용)
      const totalProducts = await prisma.product.count({ where });

      res.status(200).json({
        data: products,
        pagination: {
          total: totalProducts,
          page: parseInt(page),
          limit: parseInt(limit),
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
