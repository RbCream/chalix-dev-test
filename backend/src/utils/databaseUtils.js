const AppError = require('./AppError');

// 데이터베이스 작업을 처리하는 유틸리티 함수
const handleDatabaseOperation = async (operation, errorMessage) => {
  try {
    return await operation();
  } catch (error) {
    console.error(errorMessage, error);
    throw new AppError(errorMessage, 500);
  }
};

module.exports = {
  handleDatabaseOperation
};
