import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteAllRecords() {
  console.log("▶️  기존 데이터 삭제 시작");
  // 기존 데이터 삭제
  try {
    await prisma.comment.deleteMany();
    console.log("✅ comment 데이터 삭제 완료되었습니다.");
    await prisma.product.deleteMany({});
    console.log("✅ product 데이터 삭제 완료되었습니다.");
    await prisma.article.deleteMany();
    console.log("✅ article 데이터 삭제 완료되었습니다.");
    await prisma.user.deleteMany();
    console.log("✅ user 데이터 삭제 완료되었습니다.");
  } catch (error) {
    console.error("⛔ 기존 데이터 삭제 실패:", error);
  }
}

// deleteAllRecords()
//   .then(async () => {
//     await prisma.$disconnect();
//     console.log("✅✅ 데이터 삭제 ALL COMPLETED. ");
//   })
//   .catch(async (error) => {
//     console.error("⛔⛔ 데이터 삭제 실패 원인 : ", error);
//     await prisma.$disconnect();
//     process.exit(1);
//   });