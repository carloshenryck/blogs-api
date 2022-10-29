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

const getByPostById = async (postId) => {
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

module.exports = {
  addPost,
  getPostsByUserId,
  getByPostById,
};