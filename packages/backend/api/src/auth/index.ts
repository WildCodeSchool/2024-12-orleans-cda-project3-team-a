import express from 'express';

import getMeRouter from './get.me';
import postLoginRouter from './post.login';
import postRegisterRouter from './post.register';

const authRouter = express.Router();

authRouter.use(getMeRouter);
authRouter.use(postLoginRouter);
authRouter.use(postRegisterRouter);

export default authRouter;
