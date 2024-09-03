import { articleModel } from "../../models/articleModel.js";

export const getAllArticles = {
  getAllArticles: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        cartegory = "freeboard",
        oderBy = "recent",
        sort = "desc",
        search = "",
        searchBy = "title",
      } = req.query;
      const offset = (page - 1) * limit; // 페이지네이션 계산

      let sort_ctrl; // 정렬 기준 설정
      switch (oderBy) {
        case "recent":
          if (sort === "desc") sort_ctrl = { createdAt: "desc" };
          else sort_ctrl = { createdAt: "asc" };
          break;

        case "comment":
          if (sort === "desc") sort_ctrl = { commentCount: "desc" };
          else sort_ctrl = { commentCount: "asc" };
          break;

        default:
          sort_ctrl = { createdAt: "desc" }; // 기본값 : 최신순
      }

      let where_ctrl;

      switch (cartegory) {
        case "freeboard":
          if (search) {
            where_ctrl = {
              cartegory: "freeboard",
            };
          } else {
            where_ctrl = {
              AND: [
                {
                  cartegory: "freeboard",
                },
                {
                  title: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            };
          }
          break;

        case "market":
          if (search) {
            where_ctrl = {
              cartegory: "market",
            };
          } else {
            where_ctrl = {
              AND: [
                {
                  cartegory: "market",
                },
                {
                  title: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            };
          }
          break;

        default:
          where_ctrl = { cartegory: "freeboard" };
      }

      const articles = await articleModel.getAllArticlesByCategory(
        where_ctrl,
        sort_ctrl,
        offset,
        limit
      );
      res.status(200).json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
