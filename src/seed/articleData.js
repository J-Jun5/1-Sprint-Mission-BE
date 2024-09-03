import { faker } from "@faker-js/faker/locale/ko";

export const articleDataList = (maxCount) => {
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    const articleData = {
      title: faker.lorem.sentence({max: 20}),
      content: faker.lorem.lines({ max: 3 }),
      category: "freeboard",
    };
    result.push(articleData);
  }
  return result;
};

export default articleDataList;
