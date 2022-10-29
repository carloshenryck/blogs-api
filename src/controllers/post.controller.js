const postService = require('../services/post.service');

const addPost = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const post = await postService.addPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const getAllByUserId = async (req, res) => {
  const posts = await postService.getPostsByUserId(req.user.id);
  res.status(200).json(posts);
};

const getByPostId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { id: userId } = req.user;
    const post = await postService.editPost(postId, userId, req.body);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: postId } = req.params;
    await postService.deletePost(postId, userId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPost,
  getAllByUserId,
  getByPostId,
  editPost,
  deletePost,
};