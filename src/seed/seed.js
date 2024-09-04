import { PrismaClient } from "@prisma/client";

import { articleDataList } from "./articleData.js";
import { commentDataList } from "./commentData.js";
import { productDataList } from "./productData.js";
import { userDataList } from "./userData.js";

import { resetIdSequence } from "../utils/resetIdSequence.js";
import { sumCommentCount } from "../utils/sumCommentCount.js";
import { deleteAllRecords } from "../utils/deleteAllRecords.js";

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await deleteAllRecords();
  //ID 시퀀스 초기화
  await resetIdSequence();

  // 데이터 갯수 설정
  const userMaxCount = 10;
  const articleMaxCount = 20;
  const productMaxCount = 100;
  const commentMaxCount = 50;

  // 유저 데이터 삽입
  try {
    await prisma.user.createMany({
      data: userDataList(userMaxCount),
      skipDuplicates: true,
    });
    console.log("✅ user 데이터 시딩 완료");
  } catch (error) {
    console.error("⛔ user 데이터 시딩 실패");
    throw error;
  }

  // 유저 데이터 불러오기
  const userData = await prisma.user.findMany();
  const userNameList = userData.map((user) => user.nickname);

  console.log("▶️  유저 데이터 불러오기 완료, 다른 데이터 시딩 작업 시작");

  // 초기 데이터 삽입
  try {
    await prisma.product.createMany({
      data: productDataList(productMaxCount, userNameList),
      skipDuplicates: true,
    });
    console.log("✅✅ product 데이터 시딩 완료");

    await prisma.article.createMany({
      data: articleDataList(articleMaxCount, userNameList),
      skipDuplicates: true,
    });
    console.log("✅✅ article 데이터 시딩 완료");

    await prisma.comment.createMany({
      data: commentDataList(commentMaxCount, articleMaxCount, userNameList),
      skipDuplicates: true,
    });
    console.log("✅✅ comment 데이터 시딩 완료");
  } catch (error) {
    console.error("⛔⛔ 초기 데이터 시딩 실패");
    throw error;
  }

  try {
    await sumCommentCount();
  } catch (error) {
    console.log("⛔ sumCommentCount 실패 : ", error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅✅✅ 시딩 ALL COMPLETED. ");
  })
  .catch(async (error) => {
    console.error("⛔⛔⛔ 시딩 실패 원인 : ", error);
    await prisma.$disconnect();
    process.exit(1);
  });
