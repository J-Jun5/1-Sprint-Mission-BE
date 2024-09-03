import { faker } from "@faker-js/faker/locale/ko";

const commentData = (articleMaxCount) => {
  const data = {
    content: faker.lorem.sentence({ max: 100 }),
    articleId: faker.number.int({ min: 1, max: articleMaxCount }),
  };
  return data;
};

const commentDataList = (maxCount, articleMaxCount) => {
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    result.push(commentData(articleMaxCount));
  }
  return result;
};

export default commentDataList;
