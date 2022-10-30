const express = require('express');
const postController = require('../controllers/post.controller');
const validateToken = require('../middlewares/auth.middleware');
const postValidation = require('../middlewares/postValidation.middleware');

const router = express.Router();

router.use(validateToken);

router.get('/search', postController.getPostByTerm);
router.get('/', postController.getAllByUserId);
router.post('/', postValidation.addValidation, postController.addPost);
router.get('/:id', postController.getByPostId);
router.put('/:id', postValidation.editValidation, postController.editPost);
router.delete('/:id', postController.deletePost);

module.exports = router;