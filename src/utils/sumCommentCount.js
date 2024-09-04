import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function sumCommentCount() {
  console.log("❓❓❓ SumCommentCount 시작");
  // 모든 게시물을 조회
  const articles = await prisma.article.findMany();
  
  // 각 게시물에 대해 댓글 수를 합산하여 업데이트
  for (const article of articles) {
    const totalCommentCount = await prisma.comment.aggregate({
      where: { articleId: article.id },
      _count: {
        id: true, // 댓글의 개수를 세기 위해 id 필드를 사용
      },
    });

    await prisma.article.update({
      where: { id: article.id },
      data: {
        commentCount: totalCommentCount._count.id, // 댓글 수를 업데이트
      },
    });
  }

  console.log('✅✅✅ totalCommentCount 초기화 및 업데이트 완료');
}
