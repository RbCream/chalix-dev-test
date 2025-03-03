const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./src/routes/posts');
const db = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// 환경 변수 로드
dotenv.config();

const app = express();
// 포트 설정
const PORT = process.env.PORT || 8000;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 데이터베이스 연결 테스트
db.getConnection()
  .then(connection => {
    console.log('MySQL 데이터베이스 연결 성공');
    connection.release();
  })
  .catch(err => {
    console.error('MySQL 연결 실패:', err);
  });

// 라우트
app.use('/board/presentation', postRoutes);

// 에러 핸들러 미들웨어
app.use(errorHandler);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
