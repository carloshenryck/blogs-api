const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, Category, PostCategory, User } = require('../models');
const throwError = require('../utils/throwError');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const verifyCategoryIds = async (categoryIds) => {
  const categories = await Promise.all(categoryIds.map((categoryId) => (
    Category.findOne({ where: { id: categoryId } })
  )));

  if (categories.includes(null)) {
    throwError(400, 'one or more "categoryIds" not found');
  }
};

const addPost = async (postInfo) => {
  const t = await sequelize.transaction();
  const { categoryIds } = postInfo;
  try {
    await verifyCategoryIds(categoryIds);

    const post = await BlogPost.create(
      { ...postInfo, published: new Date(), updated: new Date() },
      { transaction: t },
    );

   await Promise.all(categoryIds.map((id) => PostCategory.create(
      { postId: post.id, categoryId: id }, 
      { transaction: t },
    )));

    await t.commit();
    return post;
  } catch (e) {
    await t.rollback();
    throw e;
  }
};

const getPostsByUserId = async (userId) => {
  const posts = BlogPost.findAll({
    where: { userId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return posts;
};

const getPostById = async (postId) => {
  const post = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  if (!post) throwError(404, 'Post does not exist');

  return post;
};

const editPost = async (postId, userId, payload) => {
  const postNotUpdated = await BlogPost.findByPk(postId);
  if (!postNotUpdated) throwError(404, 'Post does not exist');
  if (postNotUpdated.userId !== userId) throwError(401, 'Unauthorized user');

  await BlogPost.update(
    { title: payload.title, content: payload.content },
    { where: { id: postId } },
  );

  const post = await getPostById(postId);
  return post;
};

const deletePost = async (postId, userId) => {
  const post = await getPostById(postId);
  if (!post) throwError(404, 'Post does not exist');
  if (post.userId !== userId) throwError(401, 'Unauthorized user');

  await BlogPost.destroy({ where: { id: postId } });
};

module.exports = {
  addPost,
  getPostsByUserId,
  getPostById,
  editPost,
  deletePost,
};