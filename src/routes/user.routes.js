const express = require('express');
const userController = require('../controllers/user.controller');
const validateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.addUser);

router.use(validateToken);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/me', userController.deleteUser);

module.exports = router;
