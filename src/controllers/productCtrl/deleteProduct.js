import { productModel } from "../../models/productModel.js";

export const deleteProduct = {
  // 상품 삭제 API
  deleteProduct: async (req, res) => {
    const { id } = req.params;

    try {
      await productModel.deleteProduct(parseInt(id)); // 변경된 부분: 모델 메서드 호출

      res.status(204).send(); // No Content
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.code === "P2025") {
        // Prisma specific error for not found record
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },


};
