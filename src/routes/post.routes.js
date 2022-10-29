const express = require('express');
const postController = require('../controllers/post.controller');
const validateToken = require('../middlewares/auth.middleware');
const postValidation = require('../middlewares/postValidation.middleware');

const router = express.Router();

router.use(validateToken);

router.get('/', postController.getAllById);
router.post('/', postValidation, postController.addPost);

module.exports = router;