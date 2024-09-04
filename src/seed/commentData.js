import { faker } from "@faker-js/faker/locale/ko";

export const commentDataList = (maxCount, articleMaxCount, userName) => {
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    const data = {
      content: faker.lorem.sentence({ max: 100 }),
      articleId: faker.number.int({ min: 1, max: articleMaxCount }),
      authorName: userName[faker.number.int({ min: 0, max: userName.length - 1 })],
    };
    result.push(data);
  }
  return result;
};

export default commentDataList;
