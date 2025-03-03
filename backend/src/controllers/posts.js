const postService = require('../services/postService');
const AppError = require('../utils/AppError');

// 비동기 함수에서 발생하는 에러를 next()로 전달하는 유틸리티 함수
const catchAsync = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// 모든 게시글 조회
const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts);
});

// 특정 게시글 조회
const getPostById = catchAsync(async (req, res, next) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) {
    return next(new AppError('게시글을 찾을 수 없습니다.', 404));
  }
  await postService.increaseViewCount(req.params.id);
  res.status(200).json(post);
});

// 게시글 생성
const createPost = catchAsync(async (req, res, next) => {
  const result = await postService.createPost(req.body);
  res.status(201).json({
    message: result.message,
    id: result.id
  });
});

// 게시글 수정
const updatePost = catchAsync(async (req, res, next) => {
  const result = await postService.updatePost(req.params.id, req.body);
  if (!result) {
    return next(new AppError('게시글을 찾을 수 없습니다.', 404));
  }
  res.status(200).json({ message: result.message });
});

// 게시글 삭제
const deletePost = catchAsync(async (req, res, next) => {
  const result = await postService.deletePost(req.params.id);
  if (!result) {
    return next(new AppError('게시글을 찾을 수 없습니다.', 404));
  }
  res.status(200).json({ message: result.message });
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
