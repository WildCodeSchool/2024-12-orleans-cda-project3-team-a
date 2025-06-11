import express from 'express';

import getMeRouter from './get.me';
import postEditPasswordRouter from './post.edit-password';
import postLoginRouter from './post.login';
import postLogoutRouter from './post.logout';
import postRegisterRouter from './post.register';

const authRouter = express.Router();
authRouter.use(getMeRouter);
authRouter.use(postLoginRouter);
authRouter.use(postRegisterRouter);
authRouter.use(postLogoutRouter);
authRouter.use(postEditPasswordRouter);

export default authRouter;
