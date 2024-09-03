import { productModel } from "../../models/productModel.js";

export const getAllProducts = {
  // 전체 상품 조회 API
  getAllProducts: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        orderby = "recent",
        sort = "desc",
        search = "",
      } = req.query;
      const offset = (page - 1) * limit; // 페이지네이션 계산

      let sort_ctrl; // 정렬 기준 설정

      switch (orderby) {
        case "recent":
          if (sort === "desc") sort_ctrl = { createdAt: "desc" };
          else sort_ctrl = { createdAt: "asc" };
          break;

        case "price":
          if (sort === "desc") sort_ctrl = { price: "desc" };
          else sort_ctrl = { price: "asc" };
          break;

        case "like":
          if (sort === "desc") sort_ctrl = { like: "desc" };
          else sort_ctrl = { like: "asc" };
          break;

        default:
          sort_ctrl = { createdAt: "desc" }; // 기본값 : 최신순
      }

      // 검색 조건 설정
      const where = {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive", // 대소문자 구분 없이 검색
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive", // 대소문자 구분 없이 검색
            },
          },
        ],
      };

      // 상품 목록 조회 > 모델 메소드 호출
      const products = await productModel.getAllProducts({
        where,
        sort_ctrl,
        offset,
        limit,
      }); 

      // 총 상품 수 조회 (페이지네이션 용)
      const totalProducts = products.length; // 모델에서 받아온 products의 길이로 전체 수 계산

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
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
