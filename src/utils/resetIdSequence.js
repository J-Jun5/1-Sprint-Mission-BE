import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ID 시퀀스 리셋
export async function resetIdSequence() {
  console.log("▶️  ID 시퀀스 리셋 시작");
  try {
    await prisma.$executeRaw`ALTER SEQUENCE "Product_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE "Article_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE "Comment_id_seq" RESTART WITH 1;`;
    console.log("✅ ID 시퀀스 리셋 완료.");
  } catch (error) {
    console.error("⛔ ID 시퀀스 리셋 중 오류 발생:", error.message);
  }
}

