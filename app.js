import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
console.log('Trying to import productRoutes from ./routes/productRoutes.js');
import productRoute from "./src/routes/productRoute.js";
import commentRoute from "./src/routes/commentRoute.js";
import articleRoute from "./src/routes/articleRoute.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Prisma 연결 (PostgreSQL)
prisma.$connect()
  .then(() => console.log('✅ PostgreSQL (Prisma) 연결 성공'))
  .catch((error) => {
    console.error('❌ PostgreSQL (Prisma) 연결 실패:', error);
    process.exit(1);
  });

// 라우터 설정
app.use('/api', productRoute);
app.use('/api', commentRoute);
app.use('/api', articleRoute);

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// 존재하지 않는 경로 처리
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

export default app;