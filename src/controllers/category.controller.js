const categoryService = require('../services/category.service');

const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });

  const category = await categoryService.addCategory(name);
  res.status(201).json(category);
};

const getAllCategories = async (_req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json(categories);
};

module.exports = {
  addCategory,
  getAllCategories,
};