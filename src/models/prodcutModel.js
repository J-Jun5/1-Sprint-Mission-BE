import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ProductModel = {
  createProduct: async (data) => {
    return prisma.product.create({
      data,
    });
  },
  getProductById: async (id) => {
    return prisma.product.findUnique({
      where: { id },
    });
  },
  updateProduct: async (id, data) => {
    return prisma.product.update({
      where: { id },
      data,
    });
  },
  deleteProduct: async (id) => {
    return prisma.product.delete({
      where: { id },
    });
  },
  getAllProducts: async () => {
    return prisma.product.findMany();
  },
};
