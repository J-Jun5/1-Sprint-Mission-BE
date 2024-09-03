import { faker } from "@faker-js/faker/locale/ko";

const commentData = {
  content: faker.lorem.sentence({ max: 100 }),
};

const commentDataList = (maxCount) => {
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    result.push(commentData);
  }
  return result;
};

export default commentDataList;
