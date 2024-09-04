import { faker } from "@faker-js/faker/locale/ko";

export const productDataList = (maxCount, userName) => {
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    const productData = {
      img: "images/img_default.png",
      name: "로봇 청소기",
      description: "로봇 청소기입니다.",
      price: faker.number.int({ min: 1, max: 300 }) * 10000,
      like: faker.number.int({ min: 0, max: 999 }),
      tags: ["tag1", "tag2"],
      sellerName: userName[faker.number.int({ min: 0, max: userName.length - 1 })],
    };
    result.push(productData);
  }
  return result;
};

export default productDataList;
