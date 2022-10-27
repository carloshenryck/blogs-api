const express = require('express');
const userController = require('../controllers/user.controller');
const validateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', validateToken, userController.getAllUsers);
router.post('/', userController.addUser);

module.exports = router;
