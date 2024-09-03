import { productModel } from '../models/productModel.js';

export const updateProductCtrl = {

  // 상품 수정 API
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { img, name, description, price, like, tags } = req.body;

    try {
      const updatedProduct = await productModel.updateProduct(parseInt(id), {
        img,
        name,
        description,
        price,
        like,
        tags,
      }); // 변경된 부분: 모델 메서드 호출

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      if (error.code === "P2025") {
        // Prisma specific error for not found record
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};
