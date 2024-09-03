import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productModel = {
  // 모든 상품 조회
  getAllProducts: async ({ where, orderBy, offset, limit }) => {
    return await prisma.product.findMany({
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
  },

  // 특정 상품 조회
  getProductById: async (id) => {
    return await prisma.product.findUnique({
      where: { id },
    });
  },

  // 상품 생성
  createProduct: async (data) => {
    return await prisma.product.create({
      data,
    });
  },

  // 상품 수정
  updateProduct: async (id, data) => {
    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(), // 명시적으로 updatedAt 갱신
      },
    });
  },

  // 상품 삭제
  deleteProduct: async (id) => {
    return await prisma.product.delete({
      where: { id },
    });
  },
};
