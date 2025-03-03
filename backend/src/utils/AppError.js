
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // 4xx: 클라이언트 오류, 5xx: 서버 오류, 
    // 4xx일 경우 fail, 5xx일 경우 error
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; 
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
