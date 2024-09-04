import { faker } from "@faker-js/faker/locale/ko";

export const userDataList = (maxCount) => {
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    const userData = {
      nickname: faker.internet.userName().substring(0, 10),
      email: faker.internet.email(),
      password: "1234",
    };
    // console.log("userName : ", userData.nickname, " type: ", typeof userData.nickname, " length: ", userData.nickname.length);
    // console.log("email : ", userData.email, " type: ", typeof userData.email, "legth: ", userData.email.length);
    result.push(userData);
  }
  return result;
};

export default userDataList;
