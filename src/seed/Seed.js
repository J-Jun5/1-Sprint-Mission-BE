import { PrismaClient } from "@prisma/client";
import { resetIdSequence } from "utils/ResetIdSequence";

import { articleDataList } from "seed/ArticleData";
import { commentDataList } from "seed/CommentData";
import { productDataList } from "seed/ProductData";

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  try {
    await prisma.product.deleteMany({});
    console.log("✅ product 데이터 삭제 완료되었습니다.");
    await prisma.article.deleteMany();
    console.log("✅ article 데이터 삭제 완료되었습니다.");
    await prisma.comment.deleteMany();
    console.log("✅ comment 데이터 삭제 완료되었습니다.");
  } catch (error) {
    console.error("⛔ 기존 데이터 삭제 실패:", error);
  }

  //ID 시퀀스 초기화
  await resetIdSequence();

  // 초기 데이터 삽입
  const articleMaxCount = 20;
  const productMaxCount = 100;
  const commentMaxCount = 100;
  try {
    await prisma.product.createMany({
      data: productDataList(productMaxCount),
      skipDuplicates: true,
    });
    console.log("✅✅ product 데이터 시딩 완료");

    await prisma.article.createMany({
      data: articleDataList(articleMaxCount),
      skipDuplicates: true,
    });
    console.log("✅✅ article 데이터 시딩 완료");

    await prisma.comment.createMany({
      data: commentDataList(commentMaxCount, articleMaxCount),
      skipDuplicates: true,
    });
    console.log("✅✅ comment 데이터 시딩 완료");
  } catch (error) {
    console.error("⛔⛔ 초기 데이터 시딩 오류:", error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅✅✅ 시딩 ALL COMPLETED. ");
  })
  .catch(async (error) => {
    console.error("⛔⛔⛔ 시딩 오류 : ", error);
    await prisma.$disconnect();
    process.exit(1);
  });
