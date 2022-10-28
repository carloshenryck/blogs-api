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

module.exports = {
  addPost,
};