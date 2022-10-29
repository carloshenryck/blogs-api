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
    const post = await postService.getByPostById(id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPost,
  getAllByUserId,
  getByPostId,
};