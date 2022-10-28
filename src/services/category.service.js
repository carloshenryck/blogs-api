const { Category } = require('../models');

const addCategory = async (name) => {
  const category = await Category.create({ name });
  return category;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  addCategory,
  getAllCategories,
};