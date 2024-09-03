import { faker } from "@faker-js/faker/locale/ko";

const articleData = {
  title: faker.lorem.sentence({max: 20}),
  content: faker.lorem.lines({ max: 3 }),
};

const articleDataList = (maxCount) => {
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    result.push(articleData);
  }
  return result;
};

export default articleDataList;
