const db = require('../config/database');
const AppError = require('../utils/AppError');

// 데이터베이스 작업을 처리하는 유틸리티 함수
const handleDatabaseOperation = async (operation, errorMessage) => {
  try {
    return await operation();
  } catch (error) {
    throw new AppError(errorMessage, 500, error);
  }
};

const postService = {
  // 모든 게시글 조회
  getAllPosts: async () => {
    return handleDatabaseOperation(
      async () => {
        const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        return rows;
      },
      '게시글 조회 중 오류가 발생했습니다.'
    );
  },

  // 특정 게시글 조회
  getPostById: async (id) => {
    return handleDatabaseOperation(
      async () => {
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        if (rows.length === 0) {
          throw new AppError('게시글을 찾을 수 없습니다.', 404);
        }
        return rows[0];
      },
      '게시글 조회 중 오류가 발생했습니다.'
    );
  },

  // 조회수 증가
  increaseViewCount: async (id) => {
    return handleDatabaseOperation(
      async () => {
        await db.query('UPDATE posts SET view_count = view_count + 1 WHERE id = ?', [id]);
      },
      '조회수 증가 중 오류가 발생했습니다.'
    );
  },

  // 게시글 생성
  createPost: async (postData) => {
    const { title, content, author } = postData;

    if (!title || !content) {
      throw new AppError('게시글 생성 중 오류가 발생했습니다. 제목과 내용은 필수 입력사항입니다.', 400);
    }

    return handleDatabaseOperation(
      async () => {
        const [result] = await db.query(
          'INSERT INTO posts (title, content, author, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
          [title, content, author || '익명']
        );
        return {
          message: '게시글이 성공적으로 등록되었습니다.',
          id: result.insertId
        };
      },
      '게시글 생성 중 오류가 발생했습니다.'
    );
  },

  // 게시글 수정
  updatePost: async (id, updateData) => {
    const { title, content } = updateData;

    if (!title || !content) {
      throw new AppError('제목과 내용은 필수 입력사항입니다.', 400);
    }

    return handleDatabaseOperation(
      async () => {
        const [result] = await db.query(
          'UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE id = ?',
          [title, content, id]
        );

        if (result.affectedRows === 0) {
          throw new AppError('게시글을 찾을 수 없습니다.', 404);
        }

        return { message: '게시글이 성공적으로 수정되었습니다.' };
      },
      '게시글 수정 중 오류가 발생했습니다.'
    );
  },

  // 게시글 삭제
  deletePost: async (id) => {
    return handleDatabaseOperation(
      async () => {
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);

        if (rows.length === 0) {
          throw new AppError('게시글을 찾을 수 없습니다.', 404);
        }

        const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
          throw new AppError('게시글을 찾을 수 없습니다.', 404);
        }

        return { message: '게시글이 성공적으로 삭제되었습니다.' };
      },
      '게시글 삭제 중 오류가 발생했습니다.'
    );
  }
};

module.exports = postService;