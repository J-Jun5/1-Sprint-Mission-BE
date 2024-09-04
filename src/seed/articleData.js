import { faker } from "@faker-js/faker/locale/ko";

export const articleDataList = (maxCount, userName) => {
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    const articleData = {
      title: faker.lorem.sentence({max: 20}),
      content: faker.lorem.lines({ max: 3 }),
      category: "freeboard",
      authorName: userName[faker.number.int({ min: 0, max: userName.length - 1 })],
    };
    result.push(articleData);
  }
  return result;
};

export default articleDataList;
