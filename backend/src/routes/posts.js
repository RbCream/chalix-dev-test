const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

// 게시글 목록 조회
router.get('/', postsController.getAllPosts);

// 게시글 상세 조회
router.get('/:id', postsController.getPostById);

// 게시글 등록
router.post('/', postsController.createPost);

// 게시글 수정
router.put('/:id', postsController.updatePost);

// 게시글 삭제
router.delete('/:id', postsController.deletePost);

module.exports = router;
