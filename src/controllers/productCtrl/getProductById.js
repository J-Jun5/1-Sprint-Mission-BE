import { productModel } from "../../models/productModel.js";

export const getProductById = {
  // 특정 상품 조회 API
  getProductById: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await productModel.getProductById(parseInt(id));

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
