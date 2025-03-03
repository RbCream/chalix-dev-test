const db = require('../config/database');
const AppError = require('../utils/AppError');
const { handleDatabaseOperation } = require('../utils/databaseUtils');

const postService = {
  // 모든 게시글 조회
  getAllPosts: async () => {
    return handleDatabaseOperation(
      async () => {
        const [rows] = await db.query('SELECT id, conference_name, paper_title, date, note FROM posts ORDER BY date DESC');
        console.log('게시글 조회 성공 ' + rows.length + '개');  
        return rows;
      },
      '게시글 조회 중 오류가 발생했습니다.'
    );
  },

  // 특정 게시글 조회
  getPostById: async (id) => {
    return handleDatabaseOperation(
      async () => {
        const [rows] = await db.query('SELECT id, conference_name, paper_title, date, note FROM posts WHERE id = ?', [id]);
        if (rows.length === 0) {
          throw new AppError('게시글을 찾을 수 없습니다.', 404);
        }
        console.log('특정 게시글 조회 성공 / id : ' + rows[0].id);  
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
        console.log('조회수 증가 성공 / id :' + id);  
      },
      '조회수 증가 중 오류가 발생했습니다.'
    );
  },

  // 게시글 생성
  createPost: async (postData) => {
    const { conference_name, paper_title, date, note } = postData;

    if (!conference_name || !paper_title || !date) {
      throw new AppError('게시글 생성 중 오류가 발생했습니다. 학술대회명, 논문명, 날짜는 필수 입력사항입니다.', 400);
    }

    return handleDatabaseOperation(
      async () => {
        const [result] = await db.query(
          'INSERT INTO posts (conference_name, paper_title, date, note, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
          [conference_name, paper_title, date, note || '']
        );
        console.log('게시글 생성 성공'+ result.insertId);  
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
    const { conference_name, paper_title, date, note } = updateData;

    if (!conference_name || !paper_title || !date) {
      throw new AppError('학술대회명, 논문명, 날짜는 필수 입력사항입니다.', 400);
    }

    return handleDatabaseOperation(
      async () => {
        const [result] = await db.query(
          'UPDATE posts SET conference_name = ?, paper_title = ?, date = ?, note = ?, updated_at = NOW() WHERE id = ?',
          [conference_name, paper_title, date, note, id]
        );

        if (result.affectedRows === 0) {
          throw new AppError('게시글을 찾을 수 없습니다.', 404);
        }

        console.log('게시글 수정 성공');  
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

        console.log('게시글 삭제 성공');  
        return { message: '게시글이 성공적으로 삭제되었습니다.' };
      },
      '게시글 삭제 중 오류가 발생했습니다.'
    );
  }
};

module.exports = postService;