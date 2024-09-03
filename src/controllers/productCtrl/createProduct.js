import { productModel } from "../../models/productModel.js";

export const createProduct = {
    // 상품 추가 API
    createProduct: async (req, res) => {
      const { img, name, description, price, tags } = req.body;
  
      try {
        const newProduct = await productModel.createProduct({
          img,
          name,
          description,
          price,
          tags,
        });
  
        res.status(201).json(newProduct);
      } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
};
