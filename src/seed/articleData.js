import { faker } from "@faker-js/faker/locale/ko";

export const articleDataList = (maxCount, userName) => {
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    const articleData = {
      board: "freeboard",
      articleImg: "images/board_card_temp.svg",
      title: faker.lorem.sentence({max: 20}),
      content: faker.lorem.lines({ max: 3 }),
      like: faker.number.int({ min: 0, max: 10000 }),
      authorName: userName[faker.number.int({ min: 0, max: userName.length - 1 })],
    };
    result.push(articleData);
  }
  return result;
};

export default articleDataList;
