const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, Category, PostCategory } = require('../models');
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

module.exports = {
  addPost,
};