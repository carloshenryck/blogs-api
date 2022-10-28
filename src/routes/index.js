const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const categoryRouter = require('./category.routes');
const postRouter = require('./post.routes');

const routers = express.Router();

routers.use('/login', authRouter);
routers.use('/user', userRouter);
routers.use('/categories', categoryRouter);
routers.use('/post', postRouter);

module.exports = routers;