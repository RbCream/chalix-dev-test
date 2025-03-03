const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  console.error('Error :', err);

  // 클라이언트에게 반환할 에러 메시지와 상태 코드 설정
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // 예기치 않은 에러는 500으로 처리
  return res.status(500).json({
    status: 'error',
    message: '서버 오류가 발생했습니다.'
  });
};

module.exports = errorHandler;
