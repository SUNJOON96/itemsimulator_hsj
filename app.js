// app.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itemRoutes from './routes/itemRoutes.js';
import errorHandler from './middlewares/error-handler.middleware.js';

// 기타 필요한 라우트 import

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.use('/items', itemRoutes);
// 다른 라우트도 추가

// 에러 핸들러 미들웨어
app.use(errorHandler);

// 데이터베이스 연결 및 서버 시작
mongoose.connect(`mongodb://localhost:27017/your_db_name`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => {
  console.error('Database connection error:', error);
});
