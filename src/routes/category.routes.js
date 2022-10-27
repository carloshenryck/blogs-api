const express = require('express');
const categoryController = require('../controllers/category.controller');
const validateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(validateToken);

router.post('/', categoryController.addCategory);

module.exports = router;